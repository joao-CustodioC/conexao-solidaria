"use client"

import { useState } from "react"
import axios from "../plugins/axios"
import { setCurrentUser } from "../constant/config"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "../context/UserProvider"
import { Mail, Lock, ArrowRight, Heart, Users, HandHeart, Sparkles, Shield, Globe } from 'lucide-react'

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()
  const { login } = useUser()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)

    await axios
        .post("auth/login", {
          email: email,
          password: password,
        })
        .then((res) => res.data)
        .then((res) => {
          toast.success("Login efetuado com sucesso!")
          const user = res.user
          user.token = res.token
          setCurrentUser(user)
          login(user)
          navigate("/home")
        })
        .catch((error) => {
          console.error(error)
          toast.error("Erro ao efetuar login")
        })
        .finally(() => {
          setDisabled(false)
        })
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Left Side - Hero Section */}
          <div className="hidden lg:flex lg:w-3/5 flex-col justify-center items-center p-12 text-white relative">
            <div className="max-w-2xl text-center space-y-8 animate-fade-in">
              {/* Logo and Title */}
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-lg opacity-75"></div>
                    <div className="relative p-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
                      <Heart className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                      Conexão
                    </h1>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent -mt-2">
                      Solidária
                    </h1>
                  </div>
                </div>

                <p className="text-2xl text-purple-100 leading-relaxed">
                  Onde <span className="text-pink-300 font-semibold">corações generosos</span> encontram{" "}
                  <span className="text-blue-300 font-semibold">causas transformadoras</span>
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-6 mt-16">
                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Voluntariado Inteligente</h3>
                    <p className="text-purple-200">Conecte suas habilidades com quem mais precisa</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl">
                    <HandHeart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Doações Transparentes</h3>
                    <p className="text-purple-200">Acompanhe o impacto real de cada contribuição</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Impacto Mensurável</h3>
                    <p className="text-purple-200">Veja como você está transformando vidas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl"></div>

            <div className="relative z-10 w-full max-w-md">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Conexão Solidária
                </h1>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 animate-slide-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo de volta!</h2>
                  <p className="text-gray-600">Entre e continue fazendo a diferença</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>E-mail</span>
                    </label>
                    <div className="relative group">
                      <input
                          id="email"
                          type="email"
                          name="email"
                          value={email}
                          required
                          onChange={(val) => setEmail(val.target.value)}
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-300"
                          placeholder="seu@email.com"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Senha</span>
                    </label>
                    <div className="relative group">
                      <input
                          id="password"
                          type="password"
                          name="password"
                          value={password}
                          required
                          onChange={(val) => setPassword(val.target.value)}
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-300"
                          placeholder="••••••••"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <button
                      type="submit"
                      disabled={disabled}
                      className={`w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
                          disabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{disabled ? "Entrando..." : "Entrar"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Novo por aqui?{" "}
                    <Link
                        to="/criar-conta"
                        className="font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                      Criar conta gratuita
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default LoginPage
