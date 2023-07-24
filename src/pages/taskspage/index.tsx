import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Task } from "@/types";
const TasksPage = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);


  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("token salvo no localstorage:", token);
        if (!token) {
          console.log("token nao encontrado!");
          router.push("/login"); //redirecionar o usuario para pagina de login se ele nao tiver sido autenticado
          return;
        }

        const response = await fetch("http://localhost:8000/tasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Resposta da api:", data);
          setTasks(data); //atualizar o estado das tasks com os dados obtidos da api
        } else {
          console.log("Erro ao obter tarefas");
        }
      } catch (error) {
        console.log("Erro na solicitaçao de obtenção de tarefas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks Page</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.userId}>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
