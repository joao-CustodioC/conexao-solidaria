"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../../plugins/axios"
import { Heart, ArrowLeft, DollarSign, TrendingUp, Users, Sparkles, Gift } from "lucide-react"

const Doacao = () => {
    const [data, setData] = useState([])

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

    function CalculaDoacoes(valores) {
        let calc = 0
        valores.forEach((e) => {
            calc = calc + Number(e.valor)
        })
        return calc
    }

    const handlePage = (page) => {
        navigate(page)
    }

    const totalDoacoes = data.reduce((acc, inst) => acc + CalculaDoacoes(inst.doacoes || []), 0)
    const totalDoadores = data.reduce((acc, inst) => acc + (inst.doacoes?.length || 0), 0)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-16 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "3s" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
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
                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                                        <Heart className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                                        Faça sua Doação
                                    </h1>
                                    <p className="text-white/70">Escolha uma instituição e faça a diferença</p>
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
                                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                                <span className="text-white/80 text-sm font-medium">
                  R$ {totalDoacoes.toLocaleString()} arrecadados
                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black leading-none mb-8">
                <span className="block bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
                  TRANSFORME
                </span>
                                <span className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  VIDAS
                </span>
                            </h2>

                            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
                                Cada doação, por menor que seja, tem o poder de{" "}
                                <span className="text-rose-300 font-semibold">transformar vidas</span> e construir um{" "}
                                <span className="text-pink-300 font-semibold">futuro melhor</span> para nossa comunidade
                            </p>
                        </div>

                        {/* Stats Dashboard */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl">
                                        <DollarSign className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Total arrecadado</p>
                                        <p className="text-3xl font-bold text-white">R$ {totalDoacoes.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Doadores generosos</p>
                                        <p className="text-3xl font-bold text-white">{totalDoadores}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">Instituições ativas</p>
                                        <p className="text-3xl font-bold text-white">{data.length}</p>
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
                                <Sparkles className="w-6 h-6 text-rose-400" />
                                <h3 className="text-2xl font-bold text-white">Escolha uma instituição</h3>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                                {data.map((instituicao, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handlePage(`/instituicoes/doacao/${instituicao.id}`)}
                                        className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    >
                                        <div className="flex items-start space-x-4 mb-4">
                                            <div className="p-3 bg-gradient-to-r from-rose-100/20 to-pink-100/20 rounded-xl border border-white/10">
                                                <Gift className="w-6 h-6 text-rose-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-bold text-white mb-2">{instituicao.name}</h4>
                                                <p className="text-white/70 text-sm line-clamp-3">{instituicao.description}</p>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/10 pt-4 mt-4">
                                            <div className="flex justify-between items-center">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-rose-400">
                                                        R$ {CalculaDoacoes(instituicao.doacoes || []).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-white/60">Arrecadado</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-emerald-400">{instituicao.doacoes?.length || 0}</p>
                                                    <p className="text-xs text-white/60">Doadores</p>
                                                </div>
                                                <div className="text-center">
                                                    <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                                        Doar agora
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Back Button */}
                            <div className="flex justify-center pt-8 border-t border-white/10">
                                <button
                                    onClick={() => handlePage("/home")}
                                    className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                >
                                    <div className="flex items-center space-x-3">
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                        <span>Voltar ao início</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Doacao
