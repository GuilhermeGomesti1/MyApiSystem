import styles from "./styles.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Task } from "@/types";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const loadUserTasks = async (userId: string, token: string): Promise<Task[]> => {
    try {
      const tasksResponse = await fetch(
        `https://apinode1.onrender.com/users${userId}/tasks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (tasksResponse.ok) {
        return tasksResponse.json();
      } else {
        throw new Error("Erro ao obter lista de tarefas do usuário.");
      }
    } catch (err) {
      console.error("Erro ao carregar lista de tarefas:", err);
      throw err;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("hhttps://apinode1.onrender.com/signin", {
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

        const userIdValue = id;

        if (!userIdValue) {
          throw new Error("UserId not present in the response after login.");
        }

        localStorage.setItem("token", token); // Armazena o token no LocalStorage
        localStorage.setItem("userId", userIdValue);
        console.log("Token armazenado no localStorage:", token); // Armazena o ID do usuário no LocalStorage
        console.log("userId após o login:", userIdValue); 

        const tasksData = await loadUserTasks(userIdValue,token);

        router.push("/tasks"); 
        setTasks(tasksData);// Redireciona para a página de tarefas após o login bem-sucedido
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
    <form className={styles.loginForm} onSubmit={handleSubmit}>
       <h1 className={styles.welcome}>Acesso ao Painel</h1>
        <span className={styles.span}>Gerencie suas tarefas de forma fácil.</span>
      <div className={styles.divInput}>
        <label className={styles.divInput}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className={styles.loginInput}
          placeholder="Digite seu email"
        />
      </div>
      <div className={styles.divInput}>
        <label htmlFor="password" className={styles.divInput}>Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className={styles.loginInput}
          placeholder="Digite sua senha"
        />
      </div>
      <button type="submit" className={styles["login-button"]}>
        Entrar
      </button>
    </form>
  );
}
