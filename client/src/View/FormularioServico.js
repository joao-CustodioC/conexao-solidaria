import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import axios from "../plugins/axios";
import {toast, ToastContainer} from "react-toastify";

const FormularioServico = () => {
  const {id} = useParams();
  const [options, setOptions] = useState([]);
  const [instituicao, setInstituicao] = useState({
    instituicao_id: '',
    name: '',
    description: ''
  });
  const [disabled, setDisabled] = useState(false)
  const handleData = (key, value) => {
    setInstituicao(prevState => ({
      ...prevState,
      [key]: value
    }));
  };
  useEffect(() => {
    const fetchServicos = async () => {
      await axios.get(`servico/${id}`)
        .then(res => {
          return res.data
        })
        .then(res => {
          setInstituicao(res.servico)
        })
    }

    const fetchInstuicoes = async () => {
      await axios.get(`instituicoes`)
        .then(res => {
          return res.data
        })
        .then(res => {
          console.log(res.instituicoes)
          setOptions(res.instituicoes)
        })
    }

    if (id) fetchServicos()
    fetchInstuicoes()

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Faça algo com o email, como enviá-lo para um servidor
    setDisabled(true)


    let data = {
      instituicao_id : Number(instituicao.instituicao_id),
      name: instituicao.name,
      description: instituicao.description
    }
    let url = 'servico'
    let method = 'post'
    if (id) {
      url = `servico/${id}`
      method = 'put'
    }

    await axios({
      method: method,
      url: url,
      data: data,
    })
      .then(res => {
        return res.data
      })
      .then(res => {
        if (id) {
          toast.success("Atualizado com sucesso!")
        } else {
          toast.success("Criado com sucesso!")
        }

        handlePage('/servicos')
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
            <h1 className="text-xl font-semibold">Dados do Serviço</h1>
          </div>
          <div className="overflow-x-auto p-6">
            <div className="w-full p-3 flex flex-col justify-between h-auto overflow-auto lg:h-auto">
              <div className="w-full mx-auto max-w-[550px]">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5">
                    <label
                        htmlFor="servico"
                        className="mb-3 block text-base font-medium text-gray-700"
                    >
                      Instituição
                    </label>
                    <select
                        required
                        value={instituicao.instituicao_id || ''}
                        onChange={event => handleData('instituicao_id', event.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                    >
                      <option value="">-- Selecione uma opção --</option>
                      {options.map((servico, i) => (
                          <option value={servico.id} key={i}>{servico.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label
                        htmlFor="name"
                        className="mb-3 block text-base font-medium text-gray-700"
                    >
                      Serviço
                    </label>
                    <input
                        required
                        type="text"
                        value={instituicao.name || ''}
                        onChange={event => handleData('name', event.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                    />
                  </div>
                  <div className="mb-5">
                    <label
                        htmlFor="description"
                        className="mb-3 block text-base font-medium text-gray-700"
                    >
                      Descrição
                    </label>
                    <textarea
                        rows="4"
                        required
                        value={instituicao.description || ''}
                        onChange={event => handleData('description', event.target.value)}
                        className="w-full resize-none rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-blue-500 focus:shadow-md"
                    ></textarea>
                  </div>
                  <div className="flex justify-center mt-6 space-x-4">
                    <button
                        type="button"
                        onClick={() => handlePage('/servicos')}
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
          </div>
        </div>
      </div>
  )
}

export default FormularioServico
