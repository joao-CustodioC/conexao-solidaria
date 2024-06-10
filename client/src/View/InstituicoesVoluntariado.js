import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "../plugins/axios";
import { PiPersonSimpleHikeDuotone } from "react-icons/pi";

const InstituicoesVoluntariado = () => {
  const [isLoad, setIsLoad] = useState(true)
  const [data, setData] = useState([])
  useEffect( () => {
    const fetchInstuicoes = async () =>{
      await axios.get('instituicoes')
        .then(res =>{
          return res.data
        })
        .then(res =>{
          setData(res.instituicoes)
        })
    }
    fetchInstuicoes()

  }, []);
  const navigate = useNavigate();

  function CalculaDoacoes(valores){
let calc = 0
    valores.forEach(e =>{
      calc = calc + Number(e.valor)
    })
    return `R$ ${calc}`
  }
  const handlePage =  (page) => {
    navigate(page)
  }
  return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden w-full">
          <div className="flex justify-between items-center bg-blue-500 text-white p-6">
            <h1 className="text-xl font-semibold">Escolha a instituição onde você vai se voluntariar</h1>
          </div>
          <div className="overflow-x-auto p-6">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-left">Voluntários</th>
                <th className="py-3 px-6 text-left">Ação</th>
              </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
              {data.map((e, i) => (
                  <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{e.name}</td>
                    <td className="py-3 px-6 text-left">{e.voluntarios.length}</td>
                    <td className="py-3 px-6 text-left">
                      <div
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handlePage(`/instituicoes/voluntariado/${e.id}`)}
                      >
                        <PiPersonSimpleHikeDuotone/>
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-6">
              <button
                  onClick={() => handlePage('/home')}
                  className="relative inline-block px-6 py-3 font-bold text-white bg-green-500 rounded-lg overflow-hidden group"
              >
                <span className="relative z-10">Voltar</span>
                <span
                    className="absolute inset-0 w-full h-full bg-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

  )
}
export default InstituicoesVoluntariado
