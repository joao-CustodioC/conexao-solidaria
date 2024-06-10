import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import axios from "../plugins/axios";
import {FaRegEye} from 'react-icons/fa';
import {getCurrentUser} from "../constant/config";
import {useUser} from "../context/UserProvider";

const Usuarios = () => {
    const {user} = useUser()
    const [isLoad, setIsLoad] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchUsers = async () => {
            await axios.get('users')
                .then(res => {
                    return res.data
                })
                .then(res => {
                    setData(res.users)
                })
        }
        fetchUsers()

    }, []);
    const navigate = useNavigate();

    const handlePage = (page) => {
        navigate(page)
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden w-full">
                <div className="flex justify-between items-center bg-blue-500 text-white p-6">
                    <h1 className="text-xl font-semibold">Usuários</h1>
                </div>
                <div className="overflow-x-auto p-6">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Nome</th>
                            <th className="py-3 px-6 text-left">Ação</th>
                        </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                        {data.map((e, i) => (
                            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left">{e.name}</td>
                                <td className="py-3 px-6 text-left">
                                    {user && user.isAdmin && (
                                        <div
                                            className="text-blue-500 cursor-pointer"
                                            onClick={() => handlePage(`/usuarios/${e.id}`)}
                                        >
                                            <FaRegEye/>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-6 space-x-4">
                        <button
                            onClick={() => handlePage('/home')}
                            className="relative inline-block px-6 py-3 font-bold text-white bg-green-500 rounded-lg overflow-hidden group"
                        >
                            <span className="relative z-10">Voltar</span>
                            <span
                                className="absolute inset-0 w-full h-full bg-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                        </button>
                        {user && user.isAdmin && (
                            <button
                                onClick={() => handlePage('/usuarios/adicionar')}
                                className="relative inline-block px-6 py-3 font-bold text-white bg-blue-500 rounded-lg overflow-hidden group"
                            >
                                <span className="relative z-10">Adicionar</span>
                                <span
                                    className="absolute inset-0 w-full h-full bg-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Usuarios
