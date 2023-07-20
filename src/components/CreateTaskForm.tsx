// CreateTaskForm.tsx
import React, { useState } from "react";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useRouter } from "next/router";

export default function CreateTaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const taskData = {
      title,
      description,
    };
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclui o token de autenticação nos cabeçalhos
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        console.log("Tarefa criada com sucesso!");
        // Faça algo para lidar com o resultado, como atualizar a lista de tarefas exibida na página
      } else {
        console.log("Erro ao criar a tarefa");
      }
    } catch (error) {
      console.log("Erro na solicitação de criação de tarefa:", error);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
}
