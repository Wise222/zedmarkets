import { createContext, useContext, useState } from "react"

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const register = (data) => {
    const newUser = {
      ...data,
      id: Date.now(),
      joinedDate: new Date().toLocaleDateString("en-ZM", { year: "numeric", month: "long" }),
      verified: data.verified || false,
      verifiedDate: data.verifiedDate || null,
      orders: [], savedItems: [], listings: [], sales: [], cartViews: []
    }
    setUser(newUser)
    return newUser
  }

  const login = (email, password, allUsers) => {
    const found = allUsers.find(u => u.email === email && u.password === password)
    if (found) { setUser(found); return found }
    return null
  }

  const logout = () => setUser(null)
  const updateUser = (data) => setUser(prev => ({ ...prev, ...data }))

  const verifyAccount = () => {
    setUser(prev => ({ ...prev, verified: true, verifiedDate: new Date().toLocaleDateString() }))
  }

  const addListing = (listing) => {
    const newListing = {
      ...listing,
      id: Date.now(),
      dateAdded: new Date().toLocaleDateString(),
      views: 0, cartAdds: 0, sales: 0, status: "Active"
    }
    setUser(prev => ({ ...prev, listings: [...(prev.listings || []), newListing] }))
    return newListing
  }

  const removeListing = (id) => setUser(prev => ({ ...prev, listings: prev.listings.filter(l => l.id !== id) }))

  const addOrder = (order) => setUser(prev => ({
    ...prev,
    orders: [...(prev.orders || []), {
      ...order, id: Date.now(),
      date: new Date().toLocaleDateString(), status: "Processing"
    }]
  }))

  return (
    <AuthCtx.Provider value={{ user, register, login, logout, updateUser, verifyAccount, addListing, removeListing, addOrder }}>
      {children}
    </AuthCtx.Provider>
  )
}

export const useAuth = () => useContext(AuthCtx)