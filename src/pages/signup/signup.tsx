import { useState } from "react";

import connectToDataBase from "@/database/db";


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const client = await connectToDataBase();
      console.log("Conexão com o banco de dados estabelecida");
      await client.close();
      console.log("Conexão com o banco de dados encerrada");
      
        const response = await fetch(process.env.MONGODB_URL!, {
            method: "POST",
            headers: {
              "Content-Type": "application.json",
            },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Cadastro  bem sucedido:", data);
      } else {
        console.error("Erro ao cadastrar");
      }
    } catch (error) {
      console.log("Erro na chamada a API, error");
    }

  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
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
      <button type="submit">Cadastrar</button>
    </form>
  );
}
