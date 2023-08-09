import React, { useEffect, useState } from "react";

type Task = {
  taskId: string;
  title: string;
  description: string;
  completed: boolean;
};

const UserTasks = ({ userId }: { userId: string }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Função para buscar as tarefas do usuário a partir do backend
    const fetchUserTasks = async () => {
      try {
        const response = await fetch(`https://apinode-production-734f.up.railway.app/${userId}/tasks`);
        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          console.error("Erro ao buscar tarefas do usuário");
        }
      } catch (error) {
        console.error("Erro ao buscar tarefas do usuário", error);
      }
    };

    fetchUserTasks();
  }, [userId]);

  return (
    <div>
      <h1>Minhas Tarefas</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Concluída: {task.completed ? "Sim" : "Não"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserTasks;