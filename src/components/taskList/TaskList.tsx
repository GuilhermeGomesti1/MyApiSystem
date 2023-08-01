import React from "react";
import styles from "./styles.module.css";
import { Task } from "@/types";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
  
};
const TaskList: React.FC<TaskListProps> = ({ tasks,  onDeleteTask, onEditTask, }) => {
  const handleDeleteTask = (taskId: string) => {
    onDeleteTask(taskId);
   
  };

    
  return (
    <div className={styles.taskListContainer}>
      <h2 className={styles.listTitle}>Lista de Tarefas</h2>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskItem}>
          <p className={styles.title}>Título: {task.title}</p>
          <p className={styles.description}>Descrição: {task.description}</p>
          <button onClick={() => handleDeleteTask(task._id)}>Excluir</button>
          <button onClick={() => onEditTask(task)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;