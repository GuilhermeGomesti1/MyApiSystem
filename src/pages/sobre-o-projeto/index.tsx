import React from "react";
import styles from "./styles.module.css";
import Header from "@/components/header/header";

const SobreOProjeto: React.FC = () => (
  <>
    <Header />
    <div className={styles.container}>
      <h1 className={styles.tituloPrincipal}>Descrição do Projeto</h1>
      <p className={styles.descricao}>
        Meu projeto é uma aplicação web desenvolvida com Next.js que tem como
        objetivo facilitar o gerenciamento de tarefas de forma fácil e
        eficiente. Criei a aplicação com páginas para autenticação de usuários,
        onde os usuários podem fazer login usando seu email e senha. Além disso,
        implementei o recurso de cadastro (signup) para novos usuários.
      </p>

      <p className={styles.descricao}>
        Todo o projeto é baseado em uma API personalizada que criei usando
        Node.js, responsável por armazenar todas as informações no banco de
        dados. Na página de gerenciamento de tarefas, os usuários podem criar,
        editar e excluir suas tarefas, e todas as alterações são refletidas no
        banco de dados, garantindo a persistência e integridade dos dados.
      </p>

      <div>
        <h2 className={styles.subtitulo}>Funcionalidades do Projeto:</h2>
        <ul className={styles.lista}>
          <li className={styles["lista-item"]}>
            Login: Permite que os usuários autentiquem-se na aplicação usando
            email e senha.
          </li>
          <li className={styles["lista-item"]}>
            Cadastro (Signup): Implementação de cadastro para novos usuários,
            que são armazenados na API personalizada criada com Node.js.
          </li>
          <li className={styles["lista-item"]}>
            Gerenciamento de Tarefas: Os usuários podem criar, editar e excluir
            suas tarefas, com todas as alterações sendo salvas no banco de
            dados.
          </li>
        </ul>
      </div>

      <div>
        <h2 className={styles.subtitulo}>Tecnologias Utilizadas:</h2>
        <ul className={styles.lista}>
          <li className={styles["lista-item"]}>
            Next.js: Framework React para construção de aplicações web.
          </li>
          <li className={styles["lista-item"]}>
            React: Biblioteca JavaScript para criação de interfaces de usuário.
          </li>
          <li className={styles["lista-item"]}>
            CSS Modules: Método de estilização em que as classes CSS são
            escopadas localmente em componentes React.
          </li>
          <li className={styles["lista-item"]}>
            Node.js: Plataforma JavaScript usada para desenvolvimento do
            servidor e da API personalizada.
          </li>
        </ul>
      </div>

      <div>
        <h2 className={styles.subtitulo}>Funcionamento:</h2>
        <p className={styles.descricao}>
          Após autenticar-se, os usuários são redirecionados para a página de
          gerenciamento de tarefas. Lá, eles podem criar novas tarefas, editar
          tarefas existentes e excluir tarefas concluídas. Todas as operações
          realizadas são enviadas à API, garantindo que as tarefas permaneçam
          atualizadas e acessíveis em futuros acessos à aplicação.
        </p>
      </div>
    </div>
  </>
);

export default SobreOProjeto;
