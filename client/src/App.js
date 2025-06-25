import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from "./View/auth/Login"
import Home from "./View/Home"
import Instituicoes from "./View/instituicao/Instituicoes"
import FormInstituicao from "./View/instituicao/FormInstituicao"
import { ToastContainer } from "react-toastify"
import Usuarios from "./View/user/Usuarios"
import FormUsuario from "./View/user/FormUsuario"
import Servicos from "./View/servico /Servicos"
import FormServico from "./View/servico /FormServico"
import Doacao from "./View/doacao/Doacao"
import FormDoacao from "./View/doacao/FormDoacao"
import Voluntariado from "./View/voluntario/Voluntariado"
import FormVoluntario from "./View/voluntario/FormVoluntario"
import CreateUser from "./View/auth/CreateUser"
import Error from "./View/error"
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

                    <Route path="/access-denied" element={<Error />} />

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
                                <Doacao />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/doacao/:id"
                        element={
                            <ProtectedRoute>
                                <FormDoacao />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/voluntariado"
                        element={
                            <ProtectedRoute>
                                <Voluntariado />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/voluntariado/:id"
                        element={
                            <ProtectedRoute>
                                <FormVoluntario />
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
                                <FormInstituicao />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/instituicoes/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormInstituicao />
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
                                <FormServico />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/servicos/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormServico />
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
                                <FormUsuario />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/usuarios/adicionar"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <FormUsuario />
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
