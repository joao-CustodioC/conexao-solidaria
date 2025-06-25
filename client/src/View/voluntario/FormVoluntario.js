"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../../plugins/axios"
import { toast } from "react-toastify"
import { getCurrentUser } from "../../constant/config"
import { UserCheck, Briefcase, ArrowLeft, Users, Award, Target, Sparkles, HandHeart } from "lucide-react"

const FormVoluntario = () => {
    const user = getCurrentUser()
    const { id } = useParams()
    const [servicos, setServicos] = useState([])
    const [instituicao, setInstituicao] = useState({
        name: "",
        description: "",
        voluntarios: [],
    })
    const [disabled, setDisabled] = useState(false)
    const [valor, setValor] = useState("")

    useEffect(() => {
        const fetchInstuicoes = async () => {
            await axios
                .get(`instituicoes/${id}`)
                .then((res) => {
                    return res.data
                })
                .then((res) => {
                    setInstituicao(res.instituicoes)
                })
        }
        if (id) fetchInstuicoes()

        const fetchServicos = async () => {
            await axios
                .get("servico")
                .then((res) => {
                    return res.data
                })
                .then((res) => {
                    setServicos(res.servico.filter((servico) => servico.instituicao_id === Number(id)))
                })
        }
        fetchServicos()
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)

        const data = {
            user_id: user.id,
            instituicao_id: id,
            servico_id: valor,
        }
        const url = `users/instituicao/servico`
        const method = "post"

        await axios({
            method: method,
            url: url,
            data: data,
        })
            .then((res) => {
                return res.data
            })
            .then((res) => {
                toast.success("Inscrição realizada com sucesso!")
                handlePage("/instituicoes/voluntariado")
            })
            .catch((error) => {
                toast.error("Erro ao processar inscrição.")
            })
            .finally(() => {
                setDisabled(false)
            })
    }

    const navigate = useNavigate()

    const handlePage = (page) => {
        navigate(page)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-32 left-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "3s" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

            <div className="relative z-10">
                {/* Floating Header */}
                <header className="fixed top-4 left-4 right-4 z-50">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl">
                                        <UserCheck className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                                        Seja Voluntário
                                    </h1>
                                    <p className="text-white/70">Escolha como você quer contribuir</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                                <HandHeart className="w-4 h-4 text-indigo-400" />
                                <span className="text-white/80 text-sm font-medium">Voluntariado em {instituicao.name}</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
                <span className="block bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                  SEJA UM
                </span>
                                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  VOLUNTÁRIO
                </span>
                            </h2>

                            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Doe seu <span className="text-indigo-300 font-semibold">tempo e talento</span> para transformar vidas
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Institution Info */}
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mb-6 border border-white/10">
                                        <UserCheck className="w-10 h-10 text-indigo-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{instituicao.name}</h3>
                                    <p className="text-white/70 leading-relaxed">{instituicao.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg">
                                                <Users className="w-6 h-6 text-indigo-400" />
                                            </div>
                                            <span className="text-sm font-medium text-white/70">Voluntários</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{instituicao.voluntarios?.length || 0}</p>
                                    </div>

                                    <div className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                                                <Briefcase className="w-6 h-6 text-emerald-400" />
                                            </div>
                                            <span className="text-sm font-medium text-white/70">Oportunidades</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{servicos.length}</p>
                                    </div>
                                </div>

                                {/* Current Volunteers Preview */}
                                {instituicao.voluntarios && instituicao.voluntarios.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Award className="w-5 h-5 text-yellow-400" />
                                            <h4 className="text-lg font-semibold text-white">Voluntários Ativos</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {instituicao.voluntarios.slice(0, 3).map((voluntario, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                                                >
                                                    <span className="text-white/80">{voluntario.user.name}</span>
                                                    <span className="text-indigo-400 text-sm">{voluntario.servico.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Volunteer Form */}
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="text-center mb-8">
                                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full mb-6 border border-white/10">
                                        <Target className="w-10 h-10 text-emerald-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Escolha um Serviço</h3>
                                    <p className="text-white/70">Selecione a área onde você gostaria de contribuir</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-4">
                                        <label htmlFor="servico" className="flex items-center space-x-3 text-lg font-semibold text-white">
                                            <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                                                <Briefcase className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <span>Área de atuação</span>
                                        </label>
                                        <div className="relative group">
                                            <select
                                                id="servico"
                                                required
                                                value={valor}
                                                onChange={(event) => setValor(event.target.value)}
                                                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-emerald-500 focus:bg-white/20 transition-all duration-300 outline-none text-white group-hover:border-white/30"
                                            >
                                                <option value="" className="bg-gray-800 text-white">
                                                    -- Selecione um serviço --
                                                </option>
                                                {servicos.map((servico, i) => (
                                                    <option value={servico.id} key={i} className="bg-gray-800 text-white">
                                                        {servico.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                                        <button
                                            type="button"
                                            onClick={() => handlePage("/instituicoes/voluntariado")}
                                            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                                <span>Voltar</span>
                                            </div>
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={disabled || !valor}
                                            className={`group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex-1 ${
                                                disabled || !valor ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                <UserCheck className="w-5 h-5" />
                                                <span>{disabled ? "Processando..." : "Inscrever-se"}</span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Available Services */}
                        {servicos.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl mt-8">
                                <div className="flex items-center space-x-3 mb-8">
                                    <Sparkles className="w-6 h-6 text-emerald-400" />
                                    <h3 className="text-2xl font-bold text-white">Oportunidades Disponíveis</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {servicos.map((servico, i) => (
                                        <div
                                            key={i}
                                            className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            <div className="flex items-start space-x-4">
                                                <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-white/10">
                                                    <Target className="w-6 h-6 text-emerald-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-semibold text-white mb-3">{servico.name}</h4>
                                                    <p className="text-white/70 text-sm leading-relaxed">{servico.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* All Current Volunteers */}
                        {instituicao.voluntarios && instituicao.voluntarios.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl mt-8">
                                <div className="flex items-center space-x-3 mb-8">
                                    <Users className="w-6 h-6 text-indigo-400" />
                                    <h3 className="text-2xl font-bold text-white">Nossa Equipe de Voluntários</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {instituicao.voluntarios.map((voluntario, i) => (
                                        <div
                                            key={i}
                                            className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-white text-lg">{voluntario.user.name}</p>
                                                    <p className="text-indigo-400 text-sm">{voluntario.servico.name}</p>
                                                </div>
                                                <div className="p-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg">
                                                    <UserCheck className="w-5 h-5 text-indigo-400" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default FormVoluntario
