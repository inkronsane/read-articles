import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(0);

  const login = (userId) => {
    setIsLoggedIn(true);
    setUid(userId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUid(0);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, uid, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
