"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <main className="flex justify-center items-center min-h-screen  bg-gradient-to-b from-virtual-50 to-virtual-900">
  <section className="bg-white grid grid-cols-2 rounded-md w-1/2 h-96 mt-2 py-3 space-y-5" >
    <div>

    </div>
    <form className="flex flex-col p-4 gap-4 justify-center items-center" action="">
        <h1 className="text-virtual-200">Inicio de Sesión</h1>
        <TextField
            type="email"
            size="small"
            variant="standard"
            name="email"
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        <TextField
            type="password"
            size="small"
            label="Contraseña"
            variant="standard"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        <Button className="bg-virtual-50 text-black p-15-32 text-center m-4-2 cursor-pointer rounded-md" onClick={handleLogin}>Iniciar Sesión</Button>
    </form>
  </section>
</main>
  );
}
