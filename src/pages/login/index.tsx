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

    try {
      const response = await fetch("http://localhost:8000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      console.log("Resposta do Backend:", responseData); 

      if (response.ok) {
        const data = await responseData;

        const { token, id } = data;

        const userIdValue =  id;

        if (!userIdValue) {
          throw new Error("UserId not present in the response after login.");
        }

        localStorage.setItem("token", token); // Armazena o token no LocalStorage
        localStorage.setItem("userId", userIdValue);
        console.log("Token armazenado no localStorage:", token);  // Armazena o ID do usuário no LocalStorage
        console.log("userId após o login:", userIdValue); //essa id nao é a mesma que faz a verificação no backend
        router.push("/tasks"); // Redireciona para a página de tarefas após o login bem-sucedido
      } else {
        throw new Error("Erro ao fazer login");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao fazer login. Verifique o console para mais detalhes.");
    } finally {
      setEmail("");
      setPassword("");
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
