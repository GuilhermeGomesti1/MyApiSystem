import React, { useState } from "react";
import { useRouter } from "next/router";


type Description = string;
type Title = string;

export default function CreateTaskForm() {
  const [title, setTitle] = useState<Title>("");
  const [description, setDescription] = useState<Description>("");
  
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  console.log("Formulário enviado!");
    const token = localStorage.getItem("token");
    console.log("Token no frontend:", token); 

    const userId = localStorage.getItem("userId");
    console.log("UserID no frontend:", userId); 
    if (!token || !userId) {
      alert("Usuário não autenticado. Faça o login primeiro.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/${userId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({ title, description }),
      });
      console.log("Headers da requisição:", response.headers);
      if (response.ok) {
        console.log("Tarefa criada com sucesso!");
        router.push("/tasks");
      } else {
        throw new Error("Erro ao criar tarefa");
      }
    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      alert("Erro ao criar tarefa. Verifique o console para mais detalhes.");
    } finally {
      
      setTitle("");
      setDescription("");
    }
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
