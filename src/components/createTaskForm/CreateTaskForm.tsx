import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
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
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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
    event.preventDefault();
    console.log("Formulário enviado!");
    const token = localStorage.getItem("token");
    console.log("Token no frontend:", token);

    const userId = localStorage.getItem("userId");
    console.log("UserID no frontend:", userId);
    if (!token || !userId) {
      alert("Usuário não autenticado. Faça o login primeiro.");
      return;
    }

    try {
      if (isEditing && editingTask) {
        const response = await fetch(
          `http://localhost:8000/tasks/${editingTask._id}`,
          {
            method: "PUT", // or PATCH, depending on your API
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
          }
        );

        if (response.ok) {
          console.log(`Tarefa com ID ${editingTask._id} editada com sucesso!`);
          setEditingTask(null);
          setIsEditing(false);
          // Atualizar a lista de tarefas após a edição
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
        } else {
          throw new Error("Erro ao editar tarefa");
        }
      } else {
        // Código de criação de tarefa (já existente no seu código atual)
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
          }
        } else {
          throw new Error("Erro ao criar tarefa");
        }
      }
    } catch (err) {
      console.error("Erro ao criar/editar tarefa:", err);
      alert(
        "Erro ao criar/editar tarefa. Verifique o console para mais detalhes."
      );
    } finally {
      setTitle("");
      setDescription("");
    }
  };
  const handleDeleteTask = async (_id: string) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("Usuário não autenticado. Faça o login primeiro.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/tasks/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Tarefa com ID ${_id} excluída com sucesso!`);

        // Atualizar a lista de tarefas após a exclusão
        const updatedTasksResponse = await fetch(
          `http://localhost:8000/users/${userId}/tasks`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (updatedTasksResponse.ok) {
          const updatedTasksData = await updatedTasksResponse.json();
          setTasks(updatedTasksData);
        } else {
          throw new Error(
            "Erro ao obter lista atualizada de tarefas do usuário."
          );
        }
      } else {
        throw new Error(`Erro ao excluir tarefa com ID ${_id}`);
      }
    } catch (err) {
      console.error("Erro ao excluir tarefa:", err);
      alert("Erro ao excluir tarefa. Verifique o console para mais detalhes.");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(true);
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
            {isEditing ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
      <div className={styles.divList}>
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask}  />
      </div>
    </div>
  );
}
