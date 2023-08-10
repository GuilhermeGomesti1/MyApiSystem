import styles from "./styles.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { Task } from "@/types";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';



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

  const loadUserTasks = async (
    userId: string,
    token: string
  ): Promise<Task[]> => {
    try {
      const tasksResponse = await fetch(
        `https://apinode-production-734f.up.railway.app/users/${userId}/tasks`,
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
      const response = await fetch(
        "https://apinode-production-734f.up.railway.app/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Resposta do Backend:", responseData);

        const { token, id } = responseData;

        const userIdValue = id;

        if (!userIdValue) {
          throw new Error("UserId not present in the response after login.");
        }

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userIdValue);
        console.log("Token armazenado no localStorage:", token);
        console.log("userId após o login:", userIdValue);

        const tasksData = await loadUserTasks(userIdValue, token);

        toast.success("Bem vindo(a) de volta");
        router.push("/tasks");

        setTasks(tasksData);
      } else {
        throw new Error("Erro ao fazer login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao fazer login!");
     
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
        <label htmlFor="password" className={styles.divInput}>
          Senha:
        </label>
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
