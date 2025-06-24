"use client"

import { useState } from "react"
import axios from "../plugins/axios"
import { User, Mail, Lock, ArrowRight, Heart, UserPlus, Shield, Zap, Star } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CreateUser = () => {
  const [usuario, setUsuario] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [disabled, setDisabled] = useState(false)
  const handleData = (key, value) => {
    setUsuario((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)

    const data = {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
    }

    await axios({
      method: "post",
      url: "criar-conta",
      data: data,
    })
        .then((res) => {
          return res.data
        })
        .then((res) => {
          toast.success("Conta criada com sucesso!")
          handlePage("/login")
        })
        .catch((error) => {
          toast.error("Erro ao criar conta.")
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
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }}></div>
          <div className="absolute bottom-32 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
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
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full blur-lg opacity-75"></div>
                    <div className="relative p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full">
                      <UserPlus className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                      Junte-se
                    </h1>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-300 bg-clip-text text-transparent -mt-2">
                      à Causa
                    </h1>
                  </div>
                </div>

                <p className="text-2xl text-emerald-100 leading-relaxed">
                  Faça parte de uma <span className="text-emerald-300 font-semibold">comunidade global</span> que acredita no poder da{" "}
                  <span className="text-teal-300 font-semibold">solidariedade</span>
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-6 mt-16">
                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Impacto Imediato</h3>
                    <p className="text-emerald-200">Comece a fazer a diferença desde o primeiro dia</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Plataforma Segura</h3>
                    <p className="text-emerald-200">Seus dados e doações protegidos com tecnologia avançada</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 p-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Reconhecimento</h3>
                    <p className="text-emerald-200">Acompanhe seu impacto e conquiste badges especiais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl"></div>

            <div className="relative z-10 w-full max-w-md">
              <div className="lg:hidden flex items-center justify-center mb-8">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold ml-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Conexão Solidária
                </h1>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/50 animate-slide-up">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Criar conta gratuita</h2>
                  <p className="text-gray-600">Comece sua jornada solidária hoje mesmo</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Nome completo</span>
                    </label>
                    <div className="relative group">
                      <input
                          id="name"
                          type="text"
                          name="name"
                          value={usuario.name || ""}
                          required
                          onChange={(event) => handleData("name", event.target.value)}
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-300"
                          placeholder="Seu nome completo"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

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
                          value={usuario.email || ""}
                          required
                          onChange={(event) => handleData("email", event.target.value)}
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-300"
                          placeholder="seu@email.com"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
                          value={usuario.password || ""}
                          required
                          onChange={(event) => handleData("password", event.target.value)}
                          className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white transition-all duration-300 outline-none group-hover:border-gray-300"
                          placeholder="••••••••"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <button
                      type="submit"
                      disabled={disabled}
                      className={`w-full relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${
                          disabled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>{disabled ? "Criando conta..." : "Criar conta gratuita"}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Já tem uma conta?{" "}
                    <Link
                        to="/login"
                        className="font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
                    >
                      Fazer login
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

export default CreateUser
