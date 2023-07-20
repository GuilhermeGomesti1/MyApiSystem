import React, { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Autenticação bem-sucedida
      const data = await response.json();
      console.log("Resposta da API:", data);
      console.log(data);
      
      
      const token = data.token;
      console.log("Token obtido da API:", token);

      localStorage.setItem("token", token);
      console.log("Token armazenado no localStorage:", token);
      
      setTimeout(() => {
        console.log("Usuário logado com sucesso");
        router.push("/tasks");
      }, 500);
    } else {
      // Erro na autenticação
      console.log("Erro na autenticação");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
}
