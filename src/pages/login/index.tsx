import styles from './styles.module.css'
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
      if (response.ok) {
        const responseData = await response.json(); // Aguardar a resposta antes de acessar o responseData
        console.log("Resposta do Backend:", responseData);
  
        const { token, id } = responseData;

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
    <form className={styles['login-form']} onSubmit={handleSubmit}>
    <div>
      <label>Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
        className={styles['login-input']}
        placeholder="Digite seu email"
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
        className={styles['login-input']}
        placeholder="Digite sua senha"
      />
    </div>
    <button type="submit" className={styles['login-button']}>
      Entrar
    </button>
  </form>
);
}
