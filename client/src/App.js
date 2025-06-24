import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from "./View/Login"
import Home from "./View/Home"
import Instituicoes from "./View/Instituicoes"
import FormularioInst from "./View/FormularioInst"
import { ToastContainer } from "react-toastify"
import Usuarios from "./View/Usuarios"
import FormularioUsuario from "./View/FormularioUsuario"
import Servicos from "./View/Servicos"
import FormularioServico from "./View/FormularioServico"
import InstituicoesDoacao from "./View/InstituicoesDoacao"
import FormularioInstituicaoDoacao from "./View/FormularioInstituicaoDoacao"
import InstituicoesVoluntariado from "./View/InstituicoesVoluntariado"
import FormularioInstituicaoVoluntario from "./View/FormularioInstituicaoVoluntario"
import CreateUser from "./View/CreateUser"
import AccessDenied from "./View/AccessDenied"
import { UserProvider } from "./context/UserProvider"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

function App() {
    return (
        <UserProvider>
            <Router>
                <ToastContainer
                    theme="colored"
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    className="toast-container"
                    toastClassName="toast-custom"
                />
                <Routes>

                    <Route path="/" element={<Navigate to="/login" />} />

                    <Route path="/access-denied" element={<AccessDenied />} />

                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/criar-conta"
                        element={
                            <PublicRoute>
                                <CreateUser />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instituicoes/doacao"
                        element={
                            <ProtectedRoute>
                                <InstituicoesDoacao />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/doacao/:id"
                        element={
                            <ProtectedRoute>
                                <FormularioInstituicaoDoacao />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/voluntariado"
                        element={
                            <ProtectedRoute>
                                <InstituicoesVoluntariado />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/voluntariado/:id"
                        element={
                            <ProtectedRoute>
                                <FormularioInstituicaoVoluntario />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/instituicoes"
                        element={
                            <ProtectedRoute >
                                <Instituicoes />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/:id"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioInst />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioInst />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/servicos"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <Servicos />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/servicos/:id"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioServico />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/servicos/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioServico />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/usuarios"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <Usuarios />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/usuarios/:id"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioUsuario />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/usuarios/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormularioUsuario />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/access-denied" replace />} />
                </Routes>
            </Router>
        </UserProvider>
    )
}

export default App
