"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../plugins/axios"
import { useUser } from "../context/UserProvider"
import { Heart, Users, HandHeart, Building2, UserCheck, Briefcase, LogOut, TrendingUpIcon as TrendingIcon, Globe, Zap, ArrowRight, Crown, Rocket, Play, Shield, Compass, Infinity, Clock, DollarSign, Smile, Activity } from 'lucide-react'

const Home = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const { logout } = useUser()

    const [data, setData] = useState({
        instituicoes: [],
        users: [],
    })

    const [activeTab, setActiveTab] = useState("doar")

    useEffect(() => {
        const fechHomePage = async () => {
            await axios
                .get("home")
                .then((res) => {
                    return res.data
                })
                .then((res) => {
                    setData(res.resultados)
                })
        }
        fechHomePage()
    }, [])

    const handlePage = (page) => {
        navigate(page)
    }

    const handleLogout = () => {
        logout()
        handlePage("/login")
    }

    const features = [
        {
            icon: Shield,
            title: "100% Seguro",
            description: "Transações protegidas",
            color: "from-emerald-400 to-teal-500",
        },
        {
            icon: Zap,
            title: "Impacto Imediato",
            description: "Resultados em tempo real",
            color: "from-yellow-400 to-orange-500",
        },
        {
            icon: Globe,
            title: "Alcance Global",
            description: "50+ cidades conectadas",
            color: "from-blue-400 to-indigo-500",
        },
        {
            icon: Infinity,
            title: "Impacto Infinito",
            description: "Transformação contínua",
            color: "from-purple-400 to-pink-500",
        },
    ]

    const quickActions = [
        {
            title: "Doação Rápida",
            subtitle: "R$ 25 • 5 min",
            icon: DollarSign,
            gradient: "from-rose-500 to-pink-600",
            action: () => handlePage("/instituicoes/doacao"),
        },
        {
            title: "Voluntário Express",
            subtitle: "Cadastro • 2 min",
            icon: Clock,
            gradient: "from-blue-500 to-indigo-600",
            action: () => handlePage("/instituicoes/voluntariado"),
        },
        {
            title: "Encontrar Causa",
            subtitle: "Explorar • Agora",
            icon: Compass,
            gradient: "from-emerald-500 to-teal-600",
            action: () => handlePage("/instituicoes"),
        },
    ]

    const impactMetrics = [
        { label: "Vidas Transformadas", value: "1.2M+", icon: Smile, trend: "+150%" },
        { label: "Doações Este Mês", value: "R$ 2.5M", icon: TrendingIcon, trend: "+89%" },
        { label: "Voluntários Ativos", value: "15.8K", icon: Users, trend: "+67%" },
        { label: "Projetos Ativos", value: "342", icon: Activity, trend: "+23%" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-1/3 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "3s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "5s" }}
                ></div>

                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                </div>
            </div>

            <div className="relative z-10">
                {/* Floating Header */}
                <header className="fixed top-4 left-4 right-4 z-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                                        <div className="relative p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                                            <Heart className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                            Conexão Solidária
                                        </h1>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-sm text-white/70">Olá,</p>
                                            <p className="font-semibold text-white text-sm">{user?.name}</p>
                                        </div>
                                        {user?.isAdmin && (
                                            <div className="p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                                                <Crown className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all"
                                        >
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section - Immersive */}
                <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
                                <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                                  TRANSFORME
                                </span>
                                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                  O MUNDO
                                </span>
                            </h1>

                            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                                A plataforma mais avançada para conectar{" "}
                                <span className="text-pink-300 font-semibold">generosidade</span> com{" "}
                                <span className="text-purple-300 font-semibold">impacto real</span>
                            </p>

                            {/* Interactive CTA */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <button
                                    onClick={() => handlePage("/instituicoes/doacao")}
                                    className="group relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600
                                    hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white font-bold
                                    py-6 px-12 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <HandHeart className="w-8 h-8" />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xl">Começar Doação</div>
                                            <div className="text-sm opacity-90">A partir de R$ 5</div>
                                        </div>
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions Bar */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`p-3 bg-gradient-to-r ${action.gradient} rounded-xl group-hover:scale-110 transition-transform`}
                                        >
                                            <action.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-white font-semibold">{action.title}</h3>
                                            <p className="text-white/60 text-sm">{action.subtitle}</p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all ml-auto" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Features Showcase */}
                <section className="py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-white mb-4">Por que escolher a Conexão Solidária?</h2>
                            <p className="text-white/70 text-lg">Tecnologia de ponta para maximizar seu impacto</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group text-center p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-white/60">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Admin Quick Access */}
                {user?.isAdmin && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm border border-yellow-400/20 rounded-3xl p-8">
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
                                        <Crown className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Painel Administrativo</h3>
                                        <p className="text-white/70">Acesso rápido às ferramentas de gestão</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <button
                                        onClick={() => handlePage("/instituicoes")}
                                        className="group p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all hover:scale-105"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                                                <Building2 className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-white font-semibold">Instituições</h4>
                                                <p className="text-white/60 text-sm">{data?.instituicoes?.length || 0} cadastradas</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handlePage("/usuarios")}
                                        className="group p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all hover:scale-105"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                                                <Users className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-white font-semibold">Usuários</h4>
                                                <p className="text-white/60 text-sm">{data?.users?.length || 0} ativos</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handlePage("/servicos")}
                                        className="group p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-all hover:scale-105"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="p-3 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-white font-semibold">Serviços</h4>
                                                <p className="text-white/60 text-sm">Gerenciar</p>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Final CTA */}
                <section className="py-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-12">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mb-8">
                                    <Rocket className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-5xl font-bold text-white mb-6">
                                    Sua jornada de{" "}
                                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    impacto
                  </span>{" "}
                                    começa aqui
                                </h3>
                                <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
                                    Junte-se a uma comunidade global que está redefinindo o que significa fazer a diferença no mundo.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button
                                        onClick={() => handlePage("/instituicoes/doacao")}
                                        className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <HandHeart className="w-6 h-6" />
                                            <span className="text-lg">Fazer Primeira Doação</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </button>
                                    <button
                                        onClick={() => handlePage("/instituicoes/voluntariado")}
                                        className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <UserCheck className="w-6 h-6" />
                                            <span className="text-lg">Ser Voluntário</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Floating Footer */}
                <footer className="py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                                    Conexão Solidária
                                </h3>
                            </div>
                            <p className="text-white/60 mb-4">Transformando o mundo através da tecnologia e solidariedade</p>
                            <div className="text-sm text-white/40">© 2025 • Feito com ❤️ para um mundo melhor</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Home
