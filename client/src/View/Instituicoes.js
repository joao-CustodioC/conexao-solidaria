"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../plugins/axios"
import { Eye, Plus, ArrowLeft, Building2, Users, Heart, Sparkles } from "lucide-react"
import { useUser } from "../context/UserProvider"

const Instituicoes = () => {
    const [data, setData] = useState([])
    const { user } = useUser()

    useEffect(() => {
        const fetchInstuicoes = async () => {
            await axios
                .get("instituicoes")
                .then((res) => {
                    return res.data
                })
                .then((res) => {
                    setData(res.instituicoes)
                })
        }
        fetchInstuicoes()
    }, [])

    const navigate = useNavigate()

    const handlePage = (page) => {
        navigate(page)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "3s" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

            <div className="relative z-10">
                {/* Floating Header */}
                <header className="fixed top-4 left-4 right-4 z-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                        Instituições
                                    </h1>
                                    <p className="text-white/70">Gerencie as instituições cadastradas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                <span className="text-white/80 text-sm font-medium">{data.length} instituições ativas</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black leading-none mb-8">
                <span className="block bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  INSTITUIÇÕES
                </span>
                                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PARCEIRAS
                </span>
                            </h2>

                            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                                Conheça as organizações que estão{" "}
                                <span className="text-blue-300 font-semibold">transformando vidas</span> e fazendo a{" "}
                                <span className="text-purple-300 font-semibold">diferença real</span> em nossa comunidade
                            </p>
                        </div>

                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl">
                                        <Building2 className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Total de Instituições</p>
                                        <p className="text-3xl font-bold text-white">{data.length}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Voluntários Ativos</p>
                                        <p className="text-3xl font-bold text-white">
                                            {data.reduce((acc, inst) => acc + (inst.voluntarios?.length || 0), 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Doações Recebidas</p>
                                        <p className="text-3xl font-bold text-white">
                                            {data.reduce((acc, inst) => acc + (inst.doacoes?.length || 0), 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Institutions Grid */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                            <div className="flex items-center space-x-3 mb-8">
                                <Sparkles className="w-6 h-6 text-blue-400" />
                                <h3 className="text-2xl font-bold text-white">Nossas Parceiras</h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                {data.map((instituicao, i) => (
                                    <div
                                        key={i}
                                        className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <div className="flex items-start space-x-4 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-xl border border-white/10">
                                                <Building2 className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white mb-2">{instituicao.name}</h4>
                                                <p className="text-white/70 text-sm line-clamp-3">{instituicao.description}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-4 mt-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex space-x-4">
                                                    <div className="text-center">
                                                        <p className="text-lg font-bold text-emerald-400">{instituicao.voluntarios?.length || 0}</p>
                                                        <p className="text-xs text-white/60">Voluntários</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-lg font-bold text-rose-400">{instituicao.doacoes?.length || 0}</p>
                                                        <p className="text-xs text-white/60">Doações</p>
                                                    </div>
                                                </div>
                                                {user && user.isAdmin && (
                                                    <button
                                                        onClick={() => handlePage(`/instituicoes/${instituicao.id}`)}
                                                        className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8 border-t border-white/10">
                                <button
                                    onClick={() => handlePage("/home")}
                                    className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="flex items-center space-x-3">
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        <span>Voltar ao Início</span>
                                    </div>
                                </button>
                                {user && user.isAdmin && (
                                    <button
                                        onClick={() => handlePage("/instituicoes/adicionar")}
                                        className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                            <span>Nova Instituição</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Instituicoes
