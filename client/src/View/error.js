"use client"

import { useNavigate } from "react-router-dom"
import { Shield, ArrowLeft, Home, AlertTriangle, Lock } from "lucide-react"
import { useUser } from "../context/UserProvider"
import { getCurrentUser } from "../constant/config"

const Error = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const currentUser = getCurrentUser()
    const activeUser = user || currentUser

    const handleGoHome = () => {
        if (activeUser) {
            navigate("/home")
        } else {
            navigate("/login")
        }
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-16 w-80 h-80 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "3s" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Error Icon */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-full blur-3xl"></div>
                        <div className="relative inline-flex items-center justify-center w-32 h-32 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full">
                            <div className="absolute inset-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                                <Lock className="w-12 h-12 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Error Content */}
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <AlertTriangle className="w-8 h-8 text-red-400" />
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                Acesso Negado
                            </h1>
                        </div>

                        <div className="space-y-6">
                            {!activeUser ? (
                                // Usuário não logado
                                <div className="space-y-4">
                                    <p className="text-xl text-white/80 leading-relaxed">
                                        Você precisa estar <span className="text-blue-300 font-semibold">logado</span> para acessar esta
                                        página.
                                    </p>
                                    <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
                                        <div className="flex items-center space-x-3">
                                            <Shield className="w-6 h-6 text-blue-400" />
                                            <div className="text-left">
                                                <p className="text-blue-300 font-semibold">Área Protegida</p>
                                                <p className="text-blue-200/80 text-sm">
                                                    Esta página requer autenticação para garantir a segurança dos dados.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // Usuário logado mas sem permissão
                                <div className="space-y-4">
                                    <p className="text-xl text-white/80 leading-relaxed">
                                        Você não tem <span className="text-orange-300 font-semibold">permissão</span> para acessar esta
                                        área.
                                    </p>
                                    <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-4">
                                        <div className="flex items-center space-x-3">
                                            <Shield className="w-6 h-6 text-orange-400" />
                                            <div className="text-left">
                                                <p className="text-orange-300 font-semibold">Área Administrativa</p>
                                                <p className="text-orange-200/80 text-sm">
                                                    Esta funcionalidade está disponível apenas para administradores do sistema.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* User Info */}
                            {activeUser && (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="text-left">
                                            <p className="text-white/60 text-sm">Logado como:</p>
                                            <p className="text-white font-semibold">{activeUser.name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/60 text-sm">Tipo de conta:</p>
                                            <div className="flex items-center space-x-2">
                                                {activeUser.isAdmin ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                            <Shield className="w-3 h-3 mr-1" />
                            Administrador
                          </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
                            Usuário
                          </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <button
                                onClick={handleGoBack}
                                className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="flex items-center space-x-3">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    <span>Voltar</span>
                                </div>
                            </button>

                            <button
                                onClick={handleGoHome}
                                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="flex items-center space-x-3">
                                    <Home className="w-5 h-5" />
                                    <span>{activeUser ? "Ir para Home" : "Fazer Login"}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error
