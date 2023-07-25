import React, { useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

type Description = string;
type Title = string;

export default function CreateTaskForm() {
  const [title, setTitle] = useState<Title>("");
  const [description, setDescription] = useState<Description>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    event.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

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
          'sec-fetch-dest': 'task',
        },
        body: JSON.stringify({ title, description }),
      });

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
      setIsSubmitting(false);
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
