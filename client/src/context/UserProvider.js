"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { getCurrentUser, setCurrentUser } from "../constant/config"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return getCurrentUser()
  })

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    } else {
      localStorage.removeItem("activeUser")
    }
  }, [user])

  const login = (userData) => {
    setUser(userData)
    setCurrentUser(userData)
  }

  const logout = () => {
    setUser(null)
    setCurrentUser(null)
  }

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)
