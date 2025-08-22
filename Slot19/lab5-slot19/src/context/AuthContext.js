import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("auth_user", JSON.stringify(user));
  }, [user]);

  const login = async ({ email, password }) => {
    // Demo mock: bất kỳ email/pass đều đăng nhập được
    setUser({ email, name: email.split("@")[0] });
    return true;
  };

  const logout = () => setUser(null);

  const register = async ({ name, email, password }) => {
    // Demo mock register
    setUser({ email, name });
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
