import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "../plugins/axios";
import {toast, ToastContainer} from "react-toastify";
import {getCurrentUser} from "../constant/config";

const FormularioInstituicaoVoluntario = () => {
  const user = getCurrentUser()
  const {id} = useParams();
  const [servicos, setServicos] = useState([])
  const [instituicao, setInstituicao] = useState({
    name: '',
    description: '',
    voluntarios: []
  });
  const [disabled, setDisabled] = useState(false)
  const [valor, setValor] = useState('')
  const handleData = (key, value) => {
    setInstituicao(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  useEffect(() => {
    const fetchInstuicoes = async () => {
      await axios.get(`instituicoes/${id}`)
        .then(res => {
          return res.data
        })
        .then(res => {
          setInstituicao(res.instituicoes)
        })
    }
    if (id) fetchInstuicoes()
    const fetchServicos = async () => {
      await axios.get('servico')
        .then(res => {
          return res.data
        })
        .then(res => {
          setServicos(res.servico.filter(servico => servico.instituicao_id === Number(id)))
        })
    }
    fetchServicos()


  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Faça algo com o email, como enviá-lo para um servidor
    setDisabled(true)


    let data = {
      user_id: user.id,
      instituicao_id: id,
      servico_id: valor
    }
    let url = `users/instituicao/servico`
    let method = 'post'

    await axios({
      method: method,
      url: url,
      data: data,
    })
      .then(res => {
        return res.data
      })
      .then(res => {
        toast.success("Vinculádo ao servico com sucesso!")

        handlePage('/instituicoes/voluntariado')
      })
      .catch(error => {
        toast.error("Erro ao atualizar dado.")

      })
      .finally(() => {
        setDisabled(false)
      })
  };

  const navigate = useNavigate();

  const handlePage = (page) => {
    navigate(page)
  }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden w-full">
                <div className="flex justify-between items-center bg-blue-500 text-white p-6">
                    <h1 className="text-xl font-semibold">Seja voluntário na:</h1>
                </div>
                <div className="overflow-x-auto p-6">
                    <div className="w-full p-3 flex flex-col justify-between h-auto overflow-auto lg:h-auto">
                        <div className="w-full mx-auto max-w-[550px]">
                            <div className="mb-5">
                                <div className="border p-4 rounded-lg border-gray-200 dark:border-gray-700">
                                    <h1 className="text-lg md:text-xl font-bold leading-normal text-gray-900 dark:text-white">
                                        {instituicao.name || ''}
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        {instituicao.description || ''}
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-gray-700">
                                        Serviço
                                    </label>
                                    <select
                                        required
                                        value={valor}
                                        onChange={event => setValor(event.target.value)}
                                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                                    >
                                        <option value="">-- Selecione um serviço --</option>
                                        {servicos.map((servico, i) => (
                                            <option value={servico.id} key={i}>{servico.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex justify-center mt-6 space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => handlePage('/instituicoes/voluntariado')}
                                        className="relative inline-block px-6 py-3 font-bold text-white bg-green-500 rounded-lg overflow-hidden group"
                                    >
                                        <span className="relative z-10">Voltar</span>
                                        <span
                                            className="absolute inset-0 w-full h-full bg-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        ></span>
                                    </button>
                                    <button
                                        type="submit"
                                        className={`relative inline-block px-6 py-3 font-bold text-white bg-blue-500 rounded-lg overflow-hidden group ${disabled ? 'cursor-not-allowed' : ''}`}
                                    >
                                        <span className="relative z-10">Salvar</span>
                                        <span
                                            className="absolute inset-0 w-full h-full bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                        ></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {servicos.length > 0 && (
                        <div
                            className="mt-10 w-full mx-auto max-w-[550px] p-4 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Serviços
                                Disponíveis</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                {servicos.map((servico, i) => (
                                    <div key={i} className="border p-4 rounded-lg border-gray-200 dark:border-gray-700">
                                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{servico.name}</h4>
                                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 break-words">{servico.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {instituicao.voluntarios.length > 0 && (
                        <div className="mt-10 w-full mx-auto max-w-[550px] p-4 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Voluntários</h3>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {instituicao.voluntarios.map((voluntario, i) => (
                                        <li key={i} className="py-3 sm:py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {voluntario.user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        {voluntario.servico.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )


}

export default FormularioInstituicaoVoluntario
