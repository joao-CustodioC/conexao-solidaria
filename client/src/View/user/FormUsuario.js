"use client"

import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import axios from "../../plugins/axios"
import {toast} from "react-toastify"
import {User, Mail, Lock, Save, ArrowLeft, Crown} from "lucide-react"
import * as yup from 'yup'

const schema = yup.object({
    name: yup.string().required('O campo nome é obrigatório'),
    email: yup.string().email('Insira um email válido').required('O campo email é obrigatório'),
    password: yup
        .string()
        .required('O campo senha é obrigatório')
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
        .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
});

const FormUsuario = () => {
    const {id} = useParams()
    const [usuario, setUsuario] = useState({name: "", email: "", password: ""})
    const [errors, setErrors] = useState({})
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios.get(`users/${id}`)
                .then(res => res.data)
                .then(res => setUsuario(res.users))
                .catch(() => toast.error('Erro ao carregar usuário'))
        }
    }, [id])

    const handleData = (key, value) => {
        setUsuario(prev => ({...prev, [key]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisabled(true)
        setErrors({})
        try {
            await schema.validate(usuario, {abortEarly: false})
        } catch (validationError) {
            const errs = {}
            validationError.inner.forEach(err => {
                errs[err.path] = err.message
            })
            setErrors(errs)
            setDisabled(false)
            return
        }

        const data = {...usuario, isAdmin: true}
        const method = id ? 'put' : 'post'
        const url = id ? `users/${id}` : 'users'

        axios({method, url, data})
            .then(res => {
                toast.success(id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!')
                navigate('/usuarios')
            })
            .catch(() => toast.error('Erro ao salvar usuário.'))
            .finally(() => setDisabled(false))
    }

    const handlePage = (page) => {
        navigate(page)
    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div
                    className="absolute top-32 left-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute top-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: "3s"}}
                ></div>
                <div
                    className="absolute bottom-32 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
                    style={{animationDelay: "1s"}}
                ></div>
                <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
            </div>
            <div className="relative z-10">
                <header className="fixed top-4 left-4 right-4 z-50">
                    <div className="max-w-4xl mx-auto">
                        <div
                            className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur-md opacity-75"></div>
                                    <div
                                        className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
                                        <User className="w-8 h-8 text-white"/>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
                                        {id ? "Editar Usuário" : "Novo Usuário"}
                                    </h1>
                                    <p className="text-white/70">{id ? "Atualize os dados do usuário" : "Cadastre um novo usuário"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <div
                                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                                <Crown className="w-4 h-4 text-yellow-400"/>
                                <span className="text-white/80 text-sm font-medium">
                                      {id ? "Editando usuário administrador" : "Criando novo administrador"}
                                    </span>
                            </div>

                            <div
                                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Nome */}
                                    <div className="space-y-3">
                                        <label htmlFor="name"
                                               className="flex items-center space-x-3 text-lg font-semibold text-white">
                                            <div
                                                className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                                                <User className="w-5 h-5 text-emerald-400"/>
                                            </div>
                                            <span>Nome completo</span>
                                        </label>
                                        <div className="relative group">
                                            <input
                                                id="name"
                                                type="text"
                                                required
                                                value={usuario.name || ""}
                                                onChange={(event) => handleData("name", event.target.value)}
                                                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-emerald-500 focus:bg-white/20 transition-all duration-300 outline-none text-white placeholder-white/50 group-hover:border-white/30"
                                                placeholder="Digite o nome completo"
                                            />
                                            <div
                                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* E-mail */}
                                    <div className="space-y-3">
                                        <label htmlFor="email"
                                               className="flex items-center space-x-3 text-lg font-semibold text-white">
                                            <div
                                                className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                                                <Mail className="w-5 h-5 text-blue-400"/>
                                            </div>
                                            <span>E-mail</span>
                                        </label>
                                        <div className="relative group">
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                value={usuario.email || ""}
                                                onChange={(event) => handleData("email", event.target.value)}
                                                className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-blue-500 focus:bg-white/20 transition-all duration-300 outline-none text-white placeholder-white/50 group-hover:border-white/30"
                                                placeholder="Digite o e-mail"
                                            />
                                            <div
                                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    {!id && (
                                        <div className="space-y-3">
                                            <label htmlFor="password"
                                                   className="flex items-center space-x-3 text-lg font-semibold text-white">
                                                <div
                                                    className="p-2 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg">
                                                    <Lock className="w-5 h-5 text-rose-400"/>
                                                </div>
                                                <span>Senha</span>
                                            </label>
                                            <div className="relative group">
                                                <input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    value={usuario.password || ""}
                                                    onChange={(event) => handleData("password", event.target.value)}
                                                    className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-rose-500 focus:bg-white/20 transition-all duration-300 outline-none text-white placeholder-white/50 group-hover:border-white/30"
                                                    placeholder="Digite a senha"
                                                />
                                                <div
                                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
                                        <button
                                            type="button"
                                            onClick={() => handlePage("/usuarios")}
                                            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <ArrowLeft
                                                    className="w-5 h-5 group-hover:-translate-x-1 transition-transform"/>
                                                <span>Voltar</span>
                                            </div>
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={disabled}
                                            className={`group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                                                disabled ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Save className="w-5 h-5"/>
                                                <span>{disabled ? "Salvando..." : "Salvar Usuário"}</span>
                                            </div>
                                            <div
                                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default FormUsuario;
