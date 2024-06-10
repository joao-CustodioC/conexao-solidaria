import React, { useState } from 'react';
import axios from "../plugins/axios";
import { CiUser } from "react-icons/ci";

import {Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const [usuario, setUsuario] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [disabled, setDisabled] = useState(false)
  const handleData = (key, value) => {
    setUsuario(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Faça algo com o email, como enviá-lo para um servidor
    setDisabled(true)


    let data = {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
    }
    let url = 'criar-conta'
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
        toast.success("Criado com sucesso!")

        handlePage('/login')
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center bg-blue-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Crie sua conta</h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-300 p-6">
        <div className="flex flex-col bg-white shadow-lg px-6 sm:px-8 md:px-10 py-8 rounded-lg w-full max-w-md">
          <div className="font-medium self-center text-xl sm:text-2xl uppercase text-gray-800 mt-4">Login</div>
          <div className="mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Nome</label>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <CiUser/>

                  </div>
                  <input
                    id="nome"
                    type="text"
                    name="nome"
                    value={usuario.name || ''}
                    required
                    onChange={event => handleData('name', event.target.value)}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Nome"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-mail</label>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                    </svg>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={usuario.email || ''}
                    required
                    onChange={event => handleData('email', event.target.value)}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="E-Mail"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Senha</label>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={usuario.password || ''}
                    required
                    onChange={event => handleData('password', event.target.value)}
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Senha"
                  />
                </div>
              </div>
              <div className="flex w-full">

                <button
                  type="submit"
                  disabled={disabled}
                  className={`${disabled ? 'cursor-not-allowed' : ''} flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in`}
                >
                  <span className="mr-2 uppercase">Login</span>
                  <span>
                    <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                         viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </span>
                </button>
              </div>
              <div className="mt-4 text-right">
                <Link className="hover:text-blue-600 hover:underline" to="/login">
                 Voltar
                </Link>

              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CreateUser;
