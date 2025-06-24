"use client"

import { Navigate } from "react-router-dom"
import { useUser } from "../context/UserProvider"
import { getCurrentUser } from "../constant/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const PublicRoute = ({ children }) => {
    const { user } = useUser()
    const currentUser = getCurrentUser()
    const [hasShownToast, setHasShownToast] = useState(false)

    const activeUser = user || currentUser

    useEffect(() => {
        // Se já está logado e ainda não mostrou o toast
        if (activeUser && !hasShownToast) {
            toast.info(`Olá, ${activeUser.name}! Você já está logado.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setHasShownToast(true)
        }
    }, [activeUser, hasShownToast])

    // Se já está logado, redireciona para home
    if (activeUser) {
        return <Navigate to="/home" replace />
    }

    return children
}

export default PublicRoute
