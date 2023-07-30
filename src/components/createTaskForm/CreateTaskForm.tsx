import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css"
import TaskList from "../taskList/TaskList";
import { Task } from "@/types";


type Description = string;
type Title = string;

export default function CreateTaskForm() {
  const [title, setTitle] = useState<Title>("");
  const [description, setDescription] = useState<Description>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  useEffect(() => {
    // Função para carregar as tarefas do usuário após o login
    const loadTasks = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const tasksResponse = await fetch(
            `http://localhost:8000/users/${userId}/tasks`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (tasksResponse.ok) {
            const tasksData = await tasksResponse.json();
            setTasks(tasksData);
          } else {
            throw new Error("Erro ao obter lista de tarefas do usuário.");
          }
        } catch (err) {
          console.error("Erro ao carregar lista de tarefas:", err);
        }
      }
      setUserId(userId || null);
      setLoading(false);
    };

    loadTasks();
  }, []);

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

        const tasksResponse = await fetch(`http://localhost:8000/users/${userId}/tasks`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTasks(tasksData);
        }
      } else {
        throw new Error("Erro ao criar tarefa");
      }

    } catch (err) {
      console.error("Erro ao criar tarefa:", err);
      alert("Erro ao criar tarefa. Verifique o console para mais detalhes.");
    } 

   finally {
      
      setTitle("");
      setDescription("");
    }
  };

 
  return (
    <div className={styles.container}>
    <div className={styles.formContainer}> 
      <form onSubmit={handleSubmit}>
        <div>
          <label className={styles.formLabel}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
            className={styles.formInput}
          />
        </div>
        <div>
          <label className={styles.formLabeld}>Description:</label>
          <input
            type="text"
            value={description}
            onChange={handleDescriptionChange}
            required
            className={styles.formInputd}
          />
        </div>
        <button type="submit" className={styles.formButton}>
          Create Task
        </button>
      </form>
    </div>

    <div className={styles.divList}>
    <TaskList tasks={tasks}  />
</div>

  </div>
    
  );
}
