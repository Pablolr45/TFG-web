"use client";
import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as JOSE from "jose";

interface User {
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  id: string;
}
type AuthContext = {
  token: string | null;
  handleToken: (token: string) => void;
  logout: () => void;
  user: User | null;
};
export const AuthContext = createContext<AuthContext>({
  token: null,
  handleToken: function (token: string): void {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
  user: null,
});
export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(() => {
    const cookies = Cookies.get();
    if (!cookies) {
      return null;
    }
    if (Object.hasOwn(cookies, "token")) {
      return cookies["token"];
    }
    return null;
  });

  const [user, setUser] = useState<User | null>(() => {
    const cookies = Cookies.get();
    if (!cookies) {
      return null;
    }
    if (Object.hasOwn(cookies, "token")) {
      const token = cookies["token"];
      const decodedToken = JOSE.decodeJwt(token);
      return (decodedToken as unknown) as User;
    }
    return null;
  });
  const handleToken = (token: string) => {
    if (token !== null) {
      Cookies.set("token", token);
      const decodedToken = JOSE.decodeJwt(token);
      setUser(decodedToken);
      setToken(token);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    router.push("/login");
  };
  useEffect(() => {}, []);
  return (
    <AuthContext.Provider value={{ token, handleToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
