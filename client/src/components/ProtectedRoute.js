"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useUser } from "../context/UserProvider"
import { getCurrentUser } from "../constant/config"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { user } = useUser()
    const currentUser = getCurrentUser()
    const location = useLocation()
    const [hasShownToast, setHasShownToast] = useState(false)

    const activeUser = user || currentUser

    useEffect(() => {
        // Reset toast flag when location changes
        setHasShownToast(false)
    }, [location.pathname])

    // Se não há usuário logado
    if (!activeUser) {
        if (!hasShownToast) {
            toast.error("Você precisa estar logado para acessar esta página!", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setHasShownToast(true)
        }
        return <Navigate to="/access-denied" state={{ from: location, reason: "not_authenticated" }} replace />
    }

    // Se requer admin mas o usuário não é admin
    if (requireAdmin && !activeUser.isAdmin) {
        if (!hasShownToast) {
            toast.warning("Acesso negado! Esta área é restrita para administradores.", {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setHasShownToast(true)
        }
        return <Navigate to="/access-denied" state={{ from: location, reason: "insufficient_permissions" }} replace />
    }

    return children
}

export default ProtectedRoute
