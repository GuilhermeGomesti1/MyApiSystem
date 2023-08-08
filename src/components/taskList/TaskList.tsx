import React from "react";
import styles from "./styles.module.css";
import { Task } from "@/types";
import { DeleteIcon } from "../icons/iconsTasks/deleteIcon";
import { EditIcon } from "../icons/iconsTasks/editIcon";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
};
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDeleteTask,
  onEditTask,
}) => {
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
      {tasks.map((task, index) => (
        <div key={task.id} className={styles.taskItem}>
           <span className={styles.taskNumber}>{index + 1}</span>
          <p className={styles.title}>
           
            {task.title}
          </p>
          <p className={styles.description}> {task.description}</p>
          <div className={styles.buttonGroup}>
            {" "}
            <button
              onClick={() => onEditTask(task)}
              className={styles.buttonEditTask}
              title="Editar"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className={styles.buttonDeleteTask}
              title="Apagar Tarefa"
            >
              <DeleteIcon />
            </button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
