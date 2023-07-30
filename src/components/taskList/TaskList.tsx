import React  from "react";
import styles from "./styles.module.css";

type Task ={
  id: string;
    title: string;
    description: string;
}
type TaskListProps = {
  tasks: Task[];
  

};


  const TaskList: React.FC<TaskListProps> = ({ tasks} ) => {
    return (
      <div className={styles.taskListContainer}>
        <h2 className={styles.listTitle}>Lista de Tarefas</h2>
        {tasks.map((task, index) => (
          <div key={index} className={styles.taskItem}>
            <p className={styles.title}>Título: {task.title}</p>
            <p className={styles.description}>Descrição: {task.description}</p>
           
            {/* Exiba outras propriedades da tarefa, se necessário */}
          </div>
        ))}
      </div>
    );
  };
  
  export default TaskList;