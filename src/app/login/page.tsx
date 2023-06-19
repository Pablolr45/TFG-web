"use client";
import { AuthContext } from "@/providers/AuthProvider";
import { ToastContext } from "@/providers/ToastProvider";
import { AuthService } from "@/services/auth.service";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Login() {
  const { setOpenToast, setMessageToast, setSeverityToast } =
    useContext<ToastContext>(ToastContext);
  const { token, handleToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    new AuthService()
      .login(email, password)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) throw new Error("Usuario no autorizado");
          throw new Error("Error general");
        }
        return response.json();
      })
      .then((response) => {
        setSeverityToast("success");
        setMessageToast("Bienvenido!");
        setOpenToast(true);
        handleToken(response.access_token);
        router.push("/mis-escape-rooms");
      })
      .catch((reason) => {
        setSeverityToast("warning");
        setMessageToast("Credenciales no validas");
        setOpenToast(true);
      });
  };

  return (
    <main className="flex justify-center items-center min-h-screen  bg-gradient-to-b from-virtual-50 to-virtual-900">
      <section className="bg-white grid grid-cols-2 rounded-md w-1/2 h-96 mt-2 py-3 space-y-5">
        <div className="flex flex-col justify-center items-center">
          <Image src={"/logo.png"} alt="logo" width={250} height={250} />
        </div>
        <form
          className="flex flex-col p-4 gap-4 justify-center items-center"
          action=""
        >
          <h1 className="text-virtual-200">Inicio de Sesión</h1>
          <TextField
            type="email"
            size="small"
            variant="standard"
            name="email"
            id="email"
            autoComplete="off"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            size="small"
            label="Contraseña"
            variant="standard"
            autoComplete="off"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="bg-virtual-50 text-black p-15-32 text-center m-4-2 cursor-pointer rounded-md"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </form>
      </section>
    </main>
  );
}
