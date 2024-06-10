import React, {createContext, useState, useContext, useEffect} from 'react';

// Cria o contexto
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Recupera o usuário do localStorage, se existir
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar o contexto
export const useUser = () => useContext(UserContext);
