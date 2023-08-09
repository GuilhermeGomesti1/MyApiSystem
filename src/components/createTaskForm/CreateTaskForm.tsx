import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import TaskList from "../taskList/TaskList";
import { Task } from "@/types";
import { CloseIcon } from "../icons/iconsTasks/closeIcon";
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
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const router = useRouter();

  // Função para carregar as tarefas do usuário após o login
  const loadTasks = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
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
  useEffect(() => {
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

  const handleOpenCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
    setTaskToEdit(null); // Limpa a tarefa que estava sendo editada
    setTitle("");
    setDescription("");
  };

  const handleCloseCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
    setIsFormSubmitted(false);
    setIsEditModalOpen(false);
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
      if (taskToEdit) {
        // Verifique se há uma tarefa para editar
        const response = await fetch(
          `https://apinode-production-734f.up.railway.app/tasks/${taskToEdit._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, description }),
          }
        );

        if (response.ok) {
          console.log(`Tarefa com ID ${taskToEdit._id} editada com sucesso!`);
          setTasks((tarefasAntigas) =>
            tarefasAntigas.map((tarefa) =>
              tarefa._id === taskToEdit._id
                ? { ...tarefa, title, description }
                : tarefa
            )
          );
          setTaskToEdit(null); // Redefina taskToEdit após a atualização bem-sucedida
          setIsEditModalOpen(false);

          // Atualizar a lista de tarefas após a edição
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
            const tasksData = await tasksResponse.json();
            setTasks(tasksData);
            await loadTasks();
          } else {
            throw new Error("Erro ao obter lista de tarefas do usuário.");
          }
        } else {
          throw new Error("Erro ao editar tarefa");
        }
      } else {
        // Código de criação de tarefa (já existente no seu código atual)
        const response = await fetch(`https://apinode-production-734f.up.railway.app/${userId}/tasks`, {
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
            `https://apinode-production-734f.up.railway.app/users/${userId}/tasks`,
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
            setIsCreateTaskModalOpen(false);
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
      const response = await fetch(`https://apinode-production-734f.up.railway.app/users/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Tarefa com ID ${_id} excluída com sucesso!`);

        // Atualizar a lista de tarefas após a exclusão
        const updatedTasksResponse = await fetch(
          `https://apinode-production-734f.up.railway.app/users/${userId}/tasks`,
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
    setTaskToEdit(task);
    setTitle(task.title);
    setDescription(task.description);

    setIsEditModalOpen(true);
    setIsCreateTaskModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Div to darken the background */}
      {(isCreateTaskModalOpen || isEditModalOpen) && !isFormSubmitted && (
        <div
          className={styles.modalBackdrop}
          onClick={handleCloseCreateTaskModal}
        />
      )}

      {/* Modal for creating and managing tasks */}
      {isCreateTaskModalOpen && !isFormSubmitted && (
        <div className={styles.modal}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>
              {isEditing ? "Edit Task" : "Create Your Tasks"}
            </h1>
            <form onSubmit={handleSubmit} className={styles.formall}>
              <div className={styles.divForm}>
                <label className={styles.formLabel}>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.divForm}>
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
            <button
              type="button"
              onClick={handleCloseCreateTaskModal}
              className={`${styles.formButton} ${styles.buttonModalPosition} ${styles.closeButton}`}
            >
              {" "}
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {/* Button to open the "Create Task" modal */}
      {!isCreateTaskModalOpen ? (
        <button
          type="button"
          onClick={handleOpenCreateTaskModal}
          className={`${styles.formButton} ${styles.buttonInitialPosition}`}
        >
          Create Task
        </button>
      ) : null}

      {/* Task list */}
      <div className={styles.divList}>
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>

      {/* Modal for editing task */}
      {isEditModalOpen && taskToEdit && (
        <div className={styles.modal}>
          <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Edit Task</h1>
            <form onSubmit={handleSubmit} className={styles.formall}>
              <div className={styles.divForm}>
                <label className={styles.formLabel}>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  className={styles.formInput}
                />
              </div>
              <div className={styles.divForm}>
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
                Update Task
              </button>
            </form>
            <button
              type="button"
              onClick={handleCloseCreateTaskModal}
              className={`${styles.formButton} ${styles.buttonModalPosition} ${styles.closeButton}`}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
