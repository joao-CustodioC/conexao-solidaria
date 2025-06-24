"use client"

import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "../plugins/axios"
import {toast} from "react-toastify"
import {getCurrentUser} from "../constant/config"
import {Heart, DollarSign, ArrowLeft, Users, TrendingUp, Gift, Sparkles, Star} from 'lucide-react'

const FormularioInstituicaoDoacao = () => {
    const user = getCurrentUser()
    const {id} = useParams()
    const [instituicao, setInstituicao] = useState({
        name: "",
        description: "",
        doacoes: [],
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
    }, [id])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)

        console.log(Number(valor))

        if (Number(valor) < 5) {
            toast.error("Valor mínimo de doação: R$ 5,00")
            setDisabled(false)
            return
        }


        const data = {
            user_id: user.id,
            valor: valor,
        }
        const url = `instituicoes/doacao/${id}`
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
                toast.success("Doação realizada com sucesso!")
                handlePage("/instituicoes/doacao")
            })
            .catch((error) => {
                toast.error("Erro ao processar doação.")
            })
            .finally(() => {
                setDisabled(false)
            })
    }

    const navigate = useNavigate()

    const handlePage = (page) => {
        navigate(page)
    }

    const totalArrecadado = instituicao.doacoes?.reduce((acc, doacao) => acc + Number(doacao.valor), 0) || 0

    const quickAmounts = [5, 10, 25, 50, 100, 250, 500, 1000, 5000]

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-32 left-16 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: "3s"}}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: "1s"}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>

            <div className="relative z-10">
                {/* Floating Header */}
                <header className="fixed top-4 left-4 right-4 z-50">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl blur-md opacity-75"></div>
                                    <div className="relative p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl">
                                        <Heart className="w-8 h-8 text-white"/>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                                        Fazer Doação
                                    </h1>
                                    <p className="text-white/70">Sua generosidade faz a diferença</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div
                                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                                <Gift className="w-4 h-4 text-rose-400"/>
                                <span
                                    className="text-white/80 text-sm font-medium">Doação para {instituicao.name}</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
                <span
                    className="block bg-gradient-to-r from-white via-rose-200 to-pink-200 bg-clip-text text-transparent">
                  FAÇA SUA
                </span>
                                <span
                                    className="block bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  DOAÇÃO
                </span>
                            </h2>

                            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Cada contribuição é um <span
                                className="text-rose-300 font-semibold">ato de amor</span> que transforma
                                vidas
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Institution Info */}
                            <div
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full mb-6 border border-white/10">
                                        <Heart className="w-10 h-10 text-rose-400"/>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">{instituicao.name}</h3>
                                    <p className="text-white/70 leading-relaxed">{instituicao.description}</p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div
                                        className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div
                                                className="p-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg">
                                                <DollarSign className="w-6 h-6 text-rose-400"/>
                                            </div>
                                            <span className="text-sm font-medium text-white/70">Total Arrecadado</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">R$ {totalArrecadado.toLocaleString()}</p>
                                    </div>

                                    <div
                                        className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div
                                                className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                                                <Users className="w-6 h-6 text-emerald-400"/>
                                            </div>
                                            <span className="text-sm font-medium text-white/70">Doadores</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{instituicao.doacoes?.length || 0}</p>
                                    </div>
                                </div>

                                {/* Recent Donations Preview */}
                                {instituicao.doacoes && instituicao.doacoes.length > 0 && (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-5 h-5 text-yellow-400"/>
                                            <h4 className="text-lg font-semibold text-white">Últimas Doações</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {instituicao.doacoes.slice(0, 3).map((doacao, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                                                >
                                                    <span className="text-white/80">{doacao.user.name}</span>
                                                    <span className="text-emerald-400 font-semibold">
                            R$ {Number(doacao.valor).toLocaleString()}
                          </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Donation Form */}
                            <div
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <div className="text-center mb-8">
                                    <div
                                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-6 border border-white/10">
                                        <DollarSign className="w-10 h-10 text-blue-400"/>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Escolha o Valor</h3>
                                    <p className="text-white/70">Selecione ou digite o valor da sua contribuição</p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Quick Amount Buttons */}
                                    <div className="space-y-4">
                                        <label className="text-lg font-semibold text-white">Valores sugeridos</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {quickAmounts.map((amount) => (
                                                <button
                                                    key={amount}
                                                    type="button"
                                                    onClick={() => setValor(amount.toString())}
                                                    className={`group p-4 rounded-xl border-2 transition-all duration-300 ${
                                                        valor === amount.toString()
                                                            ? "border-rose-500 bg-rose-500/20 text-white"
                                                            : "border-white/20 hover:border-rose-400 hover:bg-rose-500/10 text-white/80 hover:text-white"
                                                    }`}
                                                >
                                                    <div className="text-center">
                                                        <div className="text-lg font-bold">R$ {amount}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Amount */}
                                    <div className="space-y-3">
                                        <label htmlFor="valor"
                                               className="flex items-center space-x-3 text-lg font-semibold text-white">
                                            <div
                                                className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                                                <DollarSign className="w-5 h-5 text-purple-400"/>
                                            </div>
                                            <span>Valor personalizado</span>
                                        </label>
                                        <div className="relative group">
                      <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 text-lg">
                        R$
                      </span>
                                            <input
                                                id="valor"
                                                type="number"
                                                step="0.01"
                                                min="1"
                                                required
                                                value={valor}
                                                onChange={(event) => setValor(event.target.value)}
                                                className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-purple-500 focus:bg-white/20 transition-all duration-300 outline-none text-white text-lg placeholder-white/50 group-hover:border-white/30"
                                                placeholder="0,00"
                                            />
                                            <div
                                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row gap-6 pt-8">
                                        <button
                                            type="button"
                                            onClick={() => handlePage("/instituicoes/doacao")}
                                            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                <ArrowLeft
                                                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                                                <span>Voltar</span>
                                            </div>
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={disabled || !valor}
                                            className={`group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex-1 ${
                                                disabled || !valor ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            <div className="flex items-center justify-center space-x-3">
                                                <Heart className="w-5 h-5"/>
                                                <span>{disabled ? "Processando..." : `Doar R$ ${valor || "0"}`}</span>
                                            </div>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* All Recent Donations */}
                        {instituicao.doacoes && instituicao.doacoes.length > 0 && (
                            <div
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl mt-8">
                                <div className="flex items-center space-x-3 mb-8">
                                    <Sparkles className="w-6 h-6 text-emerald-400"/>
                                    <h3 className="text-2xl font-bold text-white">Mural de Generosidade</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {instituicao.doacoes.slice(0, 9).map((doacao, i) => (
                                        <div
                                            key={i}
                                            className="group p-6 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 hover:scale-105"
                                            style={{animationDelay: `${i * 0.1}s`}}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-white text-lg">{doacao.user.name}</p>
                                                    <p className="text-white/60 text-sm">Doador generoso</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-emerald-400">
                                                        R$ {Number(doacao.valor).toLocaleString()}
                                                    </p>
                                                    <div className="flex items-center justify-end space-x-1 mt-1">
                                                        <Heart className="w-4 h-4 text-rose-400"/>
                                                        <span className="text-white/60 text-xs">Obrigado!</span>
                                                    </div>
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

export default FormularioInstituicaoDoacao
