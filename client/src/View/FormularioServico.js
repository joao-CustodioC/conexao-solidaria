"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "../plugins/axios"
import { toast } from "react-toastify"
import { Briefcase, Building2, FileText, Save, ArrowLeft, Target } from "lucide-react"

const FormularioServico = () => {
  const { id } = useParams()
  const [options, setOptions] = useState([])
  const [instituicao, setInstituicao] = useState({
    instituicao_id: "",
    name: "",
    description: "",
  })
  const [disabled, setDisabled] = useState(false)

  const handleData = (key, value) => {
    setInstituicao((prevState) => ({
      ...prevState,
      [key]: value,
    }))
  }

  useEffect(() => {
    const fetchServicos = async () => {
      await axios
          .get(`servico/${id}`)
          .then((res) => {
            return res.data
          })
          .then((res) => {
            setInstituicao(res.servico)
          })
    }

    const fetchInstuicoes = async () => {
      await axios
          .get(`instituicoes`)
          .then((res) => {
            return res.data
          })
          .then((res) => {
            setOptions(res.instituicoes)
          })
    }

    if (id) fetchServicos()
    fetchInstuicoes()
  }, [id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)

    const data = {
      instituicao_id: Number(instituicao.instituicao_id),
      name: instituicao.name,
      description: instituicao.description,
    }
    let url = "servico"
    let method = "post"
    if (id) {
      url = `servico/${id}`
      method = "put"
    }

    await axios({
      method: method,
      url: url,
      data: data,
    })
        .then((res) => {
          return res.data
        })
        .then((res) => {
          if (id) {
            toast.success("Serviço atualizado com sucesso!")
          } else {
            toast.success("Serviço criado com sucesso!")
          }
          handlePage("/servicos")
        })
        .catch((error) => {
          toast.error("Erro ao salvar serviço.")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-16 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
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
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl blur-md opacity-75"></div>
                    <div className="relative p-3 bg-gradient-to-r from-orange-500 to-pink-600 rounded-xl">
                      <Briefcase className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                      {id ? "Editar Serviço" : "Novo Serviço"}
                    </h1>
                    <p className="text-white/70">{id ? "Atualize os dados do serviço" : "Cadastre um novo serviço"}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-8">
                  <Target className="w-4 h-4 text-orange-400" />
                  <span className="text-white/80 text-sm font-medium">
                  {id ? "Editando serviço" : "Criando novo serviço"}
                </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black leading-none mb-6">
                <span className="block bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent">
                  {id ? "ATUALIZAR" : "CRIAR"}
                </span>
                  <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  SERVIÇO
                </span>
                </h2>
              </div>

              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Instituição */}
                  <div className="space-y-3">
                    <label htmlFor="instituicao" className="flex items-center space-x-3 text-lg font-semibold text-white">
                      <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                        <Building2 className="w-5 h-5 text-blue-400" />
                      </div>
                      <span>Instituição</span>
                    </label>
                    <div className="relative group">
                      <select
                          id="instituicao"
                          required
                          value={instituicao.instituicao_id || ""}
                          onChange={(event) => handleData("instituicao_id", event.target.value)}
                          className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-blue-500 focus:bg-white/20 transition-all duration-300 outline-none text-white group-hover:border-white/30"
                      >
                        <option value="" className="bg-gray-800 text-white">
                          -- Selecione uma instituição --
                        </option>
                        {options.map((inst, i) => (
                            <option value={inst.id} key={i} className="bg-gray-800 text-white">
                              {inst.name}
                            </option>
                        ))}
                      </select>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Nome do Serviço */}
                  <div className="space-y-3">
                    <label htmlFor="name" className="flex items-center space-x-3 text-lg font-semibold text-white">
                      <div className="p-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-lg">
                        <Target className="w-5 h-5 text-orange-400" />
                      </div>
                      <span>Nome do Serviço</span>
                    </label>
                    <div className="relative group">
                      <input
                          id="name"
                          type="text"
                          required
                          value={instituicao.name || ""}
                          onChange={(event) => handleData("name", event.target.value)}
                          className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-orange-500 focus:bg-white/20 transition-all duration-300 outline-none text-white placeholder-white/50 group-hover:border-white/30"
                          placeholder="Digite o nome do serviço"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="space-y-3">
                    <label htmlFor="description" className="flex items-center space-x-3 text-lg font-semibold text-white">
                      <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg">
                        <FileText className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span>Descrição</span>
                    </label>
                    <div className="relative group">
                    <textarea
                        id="description"
                        rows="6"
                        required
                        value={instituicao.description || ""}
                        onChange={(event) => handleData("description", event.target.value)}
                        className="w-full px-6 py-4 bg-white/10 border-2 border-white/20 rounded-xl focus:border-emerald-500 focus:bg-white/20 transition-all duration-300 outline-none text-white placeholder-white/50 resize-none group-hover:border-white/30"
                        placeholder="Descreva o serviço oferecido"
                    />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
                    <button
                        type="button"
                        onClick={() => handlePage("/servicos")}
                        className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Voltar</span>
                      </div>
                    </button>
                    <button
                        type="submit"
                        disabled={disabled}
                        className={`group relative overflow-hidden bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                            disabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Save className="w-5 h-5" />
                        <span>{disabled ? "Salvando..." : "Salvar Serviço"}</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
  )
}

export default FormularioServico
