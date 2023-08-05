import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Header from "@/components/header/header";

export default function Signup() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Fazer uma chamada de API para criar o usuário usando os dados fornecidos
    const response = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      // Usuário criado com sucesso
      console.log("Usuário criado com sucesso!");

      // Obter o ID do usuário recém-criado da resposta da API
      const newUser = await response.json();
      const userId = newUser.id;

      // Criar a tarefa para o usuário recém-criado
      const taskResponse = await fetch(
        `http://localhost:8000/${userId}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: "Task Title",
            description: "Task Description",
          }),
        }
      );

      if (taskResponse.ok) {
        // Tarefa criada com sucesso
        console.log("Tarefa criada com sucesso!");
      } else {
        // Erro ao criar tarefa
        console.log("Erro ao criar tarefa");
      }

      router.push("/tasks");
    } else {
      // Erro ao criar usuário
      console.log("Erro ao criar usuário");
    }
  };

  return (
    <div>
      <Header />

      <h1 className={styles.signUpTitle}>CADASTRE-SE PARA TER ACESSO</h1>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <div className={styles.divInput}>
        <label className={styles.divInput}>First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={styles["signup-input"]}
          />
        </div>

        <div className={styles.divInput}>
        <label className={styles.divInput}>Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={styles["signup-input"]}
          />{" "}
        </div>

        <div className={styles.divInput}>
        <label className={styles.divInput}>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["signup-input"]}
          />
        </div>
        <div className={styles.divInput}>
        <label className={styles.divInput}>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles["signup-input"]}
          />{" "}
        </div>
        <button type="submit" className={styles["signup-button"]}>
          Signup
        </button>
      </form>
      <a href="/" className={styles.aGoToLogin}>
        <h2 className={styles.gotologin}>
          Já possui uma conta? faça o login e administre suas tarefas.
        </h2>
      </a>
    </div>
  );
}
