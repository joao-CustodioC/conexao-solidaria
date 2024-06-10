import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./View/Login";
import Home from "./View/Home";
import Instituicoes from "./View/Instituicoes";
import FormularioInst from "./View/FormularioInst";
import {ToastContainer} from "react-toastify";
import React from "react";
import Usuarios from "./View/Usuarios";
import FormularioUsuario from "./View/FormularioUsuario";
import Servicos from "./View/Servicos";
import FormularioServico from "./View/FormularioServico";
import InstituicoesDoacao from "./View/InstituicoesDoacao";
import FormularioInstituicaoDoacao from "./View/FormularioInstituicaoDoacao";
import InstituicoesVoluntariado from "./View/InstituicoesVoluntariado";
import FormularioInstituicaoVoluntario from "./View/FormularioInstituicaoVoluntario";
import CreateUser from "./View/CreateUser";
import {UserProvider} from "./context/UserProvider";
function App() {
  return (
    <UserProvider>
      <Router>
        <ToastContainer theme="colored" />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/criar-conta" element={<CreateUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/instituicoes" element={<Instituicoes/>} />
          <Route path="/instituicoes/doacao" element={<InstituicoesDoacao/>} />
          <Route path="/instituicoes/doacao/:id" element={<FormularioInstituicaoDoacao/>} />
          <Route path="/instituicoes/voluntariado" element={<InstituicoesVoluntariado/>} />
          <Route path="/instituicoes/voluntariado/:id" element={<FormularioInstituicaoVoluntario/>} />
          <Route path="/instituicoes/:id?" element={<FormularioInst/>} />
          <Route path="/instituicoes/adicionar" element={<FormularioInst/>} />
          <Route path="/servicos" element={<Servicos/>} />
          <Route path="/servicos/:id?" element={<FormularioServico/>} />
          <Route path="/servicos/adicionar" element={<FormularioServico/>} />
          <Route path="/usuarios" element={<Usuarios/>} />
          <Route path="/usuarios/:id?" element={<FormularioUsuario/>} />
          <Route path="/usuarios/adicionar" element={<FormularioUsuario/>} />
        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
