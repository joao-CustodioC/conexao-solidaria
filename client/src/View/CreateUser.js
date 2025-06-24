"use client"

import { useState } from "react"
import axios from "../plugins/axios"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {UserPlus, Mail, Lock, ArrowRight, Zap, Shield, Star, Heart} from 'lucide-react'
import * as yup from 'yup'

// Schema de validação para criação de usuário
const createUserSchema = yup.object({
  name: yup.string().required('O campo nome é obrigatório'),
  email: yup.string().email('Insira um email válido').required('O campo email é obrigatório'),
  password: yup
      .string()
      .required('O campo senha é obrigatório')
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .matches(/[0-9]/, 'A senha deve conter pelo menos um número')
      .matches(/[^A-Za-z0-9]/, 'A senha deve conter pelo menos um caractere especial'),
});

const CreateUser = () => {
  const [usuario, setUsuario] = useState({ name: "", email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  const handleData = (key, value) => {
    setUsuario(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    setDisabled(true)

    // Validação local
    try {
      await createUserSchema.validate(usuario, { abortEarly: false })
    } catch (validationError) {
      const errObj = {}
      validationError.inner.forEach(err => { errObj[err.path] = err.message })
      setErrors(errObj)
      setDisabled(false)
      return
    }

    // Envio ao servidor
    axios.post('auth/criar-conta', usuario)
        .then(res => res.data)
        .then(() => {
          toast.success('Conta criada com sucesso!')
          navigate('/login')
        })
        .catch(() => toast.error('Erro ao criar conta.'))
        .finally(() => setDisabled(false))
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
                  {/* Nome */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={usuario.name}
                        onChange={e => handleData('name', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white"
                        placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={usuario.email}
                        onChange={e => handleData('email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white"
                        placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  {/* Senha */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                      Senha
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={usuario.password}
                        onChange={e => handleData('password', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  <button
                      type="submit"
                      disabled={disabled}
                      className={`w-full py-3 font-bold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {disabled ? 'Criando conta...' : 'Criar conta gratuita'}
                  </button>
                </form>
                <p className="mt-6 text-center text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-emerald-600 hover:underline">
                    Fazer login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CreateUser
