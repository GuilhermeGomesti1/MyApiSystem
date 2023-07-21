import { TokenPayload } from "your-shared-module";

import React, { useState } from "react";
import { useRouter } from "next/router";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
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
      if (!token) {
        console.log("Token não encontrado. O usuário não está autenticado.");
        return;
      }
      
      console.log("Token encontrado:", token);
      
      // Verifica se o token não é null ou undefined
      if (typeof token !== 'string') {
        throw new Error('Token inválido');
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as Secret) as TokenPayload;
      
      if (!('userId' in decodedToken)) {
        throw new Error('Invalid token: userId is missing');
      }
      
      console.log("Decoded Token:", decodedToken);
      const userId = decodedToken.userId;
      console.log("UserID do usuário:", userId);
      
      const response = await fetch(`http://localhost:8000/users/${userId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(taskData),
      });

      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Resposta da API:", data);
        //router.push("/tasks"); oi
        router.push(`/users/${userId}/tasks`);
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
