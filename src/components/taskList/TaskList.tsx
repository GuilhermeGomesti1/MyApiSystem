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
       {tasks.length === 0 ? ( // Verifica se a lista de tarefas está vazia
        <h2 className={styles.listTitle}> </h2>
      ) : (
        <h2 className={styles.listTitle}>Lista de Tarefas</h2>
      )}
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskItem}>
          <p className={styles.title}><span className={styles.titleTask}></span> {task.title}</p>
          <p className={styles.description}> {task.description}</p>
          
          <button onClick={() => onEditTask(task)} className={styles.buttonEditTask}>Edit</button>
          <button onClick={() => handleDeleteTask(task._id)} className={styles.buttonDeleteTask}>Excluir</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;