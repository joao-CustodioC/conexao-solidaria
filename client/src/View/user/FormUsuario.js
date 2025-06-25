"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../../plugins/axios"
import { toast } from "react-toastify"
import { User, Mail, Lock, Save, ArrowLeft, Crown } from "lucide-react"
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
  const { id } = useParams()
  const [usuario, setUsuario] = useState({ name: "", email: "", password: "" })
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
    setUsuario(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)
    setErrors({})
    try {
      await schema.validate(usuario, { abortEarly: false })
    } catch (validationError) {
      const errs = {}
      validationError.inner.forEach(err => { errs[err.path] = err.message })
      setErrors(errs)
      setDisabled(false)
      return
    }

    const data = { ...usuario, isAdmin: true }
    const method = id ? 'put' : 'post'
    const url = id ? `users/${id}` : 'users'

    axios({ method, url, data })
        .then(res => {
          toast.success(id ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!')
          navigate('/usuarios')
        })
        .catch(() => toast.error('Erro ao salvar usuário.'))
        .finally(() => setDisabled(false))
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
        {/* ... elementos de background omitidos por brevidade ... */}
        <div className="relative z-10">
          {/* Header omitido ... */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 backdrop-blur-2xl p-8 rounded-3xl">
                {/* Nome */}
                <div>
                  <label htmlFor="name">Nome completo</label>
                  <input
                      id="name"
                      type="text"
                      value={usuario.name}
                      onChange={e => handleData('name', e.target.value)}
                      className="w-full p-3 rounded"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* E-mail */}
                <div>
                  <label htmlFor="email">E-mail</label>
                  <input
                      id="email"
                      type="email"
                      value={usuario.email}
                      onChange={e => handleData('email', e.target.value)}
                      className="w-full p-3 rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Senha */}
                <div>
                  <label htmlFor="password">Senha</label>
                  <input
                      id="password"
                      type="password"
                      value={usuario.password}
                      onChange={e => handleData('password', e.target.value)}
                      className="w-full p-3 rounded"
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                {/* Ações */}
                <div className="flex space-x-4">
                  <button type="button" onClick={() => navigate('/usuarios')} className="px-6 py-2 border rounded">
                    Voltar
                  </button>
                  <button type="submit" disabled={disabled} className="px-6 py-2 bg-green-600 text-white rounded">
                    {disabled ? 'Salvando...' : id ? 'Atualizar' : 'Salvar Usuário'}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
  )
}

export default FormUsuario;