import React, { useState } from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Header from "@/components/header/header";
import { PersonIcon } from "@/components/icons/iconsSobreMim/person";
import Image from "next/image";

const SobreMim: React.FC = () => {
  const [showProjects, setShowProjects] = useState(false);

  const handleShowProjects = () => {
    setShowProjects(!showProjects);
  };

  const handleShowLess = () => {
    setShowProjects(false);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Sobre Mim</title>
        </Head>

        <h1 className={styles.titulo}>
          Guilherme Gomes - Desenvolvedor Frontend
        </h1>
        <div className={styles.photocontainer}>
          <Image
            src="https://avatars.githubusercontent.com/u/106498363?u=69944eb7c6a61b6f01b54fa9d6d953c60725ecf6&v=4"
            unoptimized
            width={500}
            height={500}
            alt="imagem de perfil github encontrar ela"
            className={`${styles.photo} rounded-image`}
          />
        </div>

        <p className={styles.descricao}>
          {" "}
          <PersonIcon />
          Sou Guilherme Gomes, um desenvolvedor frontend apaixonado por
          programação e fascinado pelo poder de transformação da tecnologia.
          Atualmente, estudo Análise e Desenvolvimento de Sistemas e concentro
          meus esforços no desenvolvimento front-end.
        </p>

        <h1 className={styles.titulo}>Experiência Profissional:</h1>

        <p className={styles.subtitulo}>
          Desenvolvedor Web | Front-End Freelancer | Janeiro 2023 - Março 2023
        </p>
        <p className={styles.descricao}>
          Durante este período, atuei como freelancer, desenvolvendo um site
          completo com sistema de gestão de conteúdo utilizando tecnologias como
          Next.js, TypeScript, JavaScript, HTML e SCSS. Fui responsável por
          construir todas as funcionalidades do site de forma responsiva,
          permitindo que o cliente atualizasse o conteúdo de forma autônoma. O
          projeto foi entregue com sucesso ao cliente.
        </p>

        <div className={styles.projects}>
          <h1 className={styles.projectsh1}>Projetos Concluídos:</h1>

          <p className={styles.projectsh2}>Healthy-Life-Nutrition:</p>
          <p className={styles.projectsp}>
            Desenvolvimento de um site para vendas de ebooks e postagens de
            dicas e receitas, utilizando tecnologias modernas como HTML, SCSS,
            JS, TypeScript e NextJS. Implementei um Sistema de Gestão de
            Conteúdo para permitir que o cliente atualize o conteúdo de forma
            autônoma. O site é responsivo e acessível em todos os dispositivos.
          </p>

        

          <p className={styles.projectsh2}>Newsystem-Tickets:</p>
          <p className={styles.projectsp}>
            Desenvolvimento de uma aplicação com sistema de login completo,
            utilizando Firebase para proteger as informações dos usuários. A
            aplicação permite a adição de clientes e abertura de chamados para
            diferentes tipos de atendimentos, com elementos editáveis e
            responsivos para uma melhor experiência do usuário.
          </p>

         

          <p className={styles.projectsh2}>Prime-Flix-Filmes:</p>
          <p className={styles.projectsp}>
            Uma aplicação que utiliza uma API externa para buscar informações
            sobre os filmes em cartaz no momento. O site exibe detalhes do
            filme, como imagem de cartaz, informações relevantes e trailer do
            filme obtido do Youtube. Os usuários podem adicionar filmes aos
            favoritos, editá-los e visualizar mais detalhes.
          </p>

          {showProjects ? (
            <>
          <p className={styles.projectsh2}>APIREST:</p>
          <p className={styles.projectsp}>
            Desenvolvimento de uma API REST completa, com CRUD de usuários,
            utilizando Node, Express, TypeScript e MongoDB. O deploy da
            aplicação foi realizado no Railway. Durante o desenvolvimento, foram
            aplicados princípios do SOLID, injeção de dependência e o uso do
            Repository Pattern.
          </p>

          <p className={styles.projectsh2}>Favorite-Bands:</p>
          <p className={styles.projectsp}>
            Desenvolvimento de uma página com sistema de login que permite aos
            usuários selecionar um estilo musical dentre vários disponíveis e
            adicionar sua banda favorita para o estilo escolhido. O site é
            totalmente responsivo e se adapta a todos os dispositivos.
          </p>

          <h1 className={styles.projectsh1}>Educação:</h1>

          <p className={styles.projectsp}>
            Análise e Desenvolvimento de Sistemas na UNIFCV - Centro
            Universitário Cidade Verde (Cursando, EAD)
          </p>
          <p className={styles.projectsp}>
            Cursos de HTML5 e CSS3, Curso JavaScript, ReactJS, TypeScript,
            NextJS
          </p>

          <h2 className={styles.projectsh1}>Habilidades:</h2>

          <p className={styles.projectsp}>
            NextJS, TypeScript, SCSS, CSS, HTML, ReactJS, JavaScript, Node.js
            (Front-End)
          </p>

          <div className={styles.vejaMaisMenosContainer}>
        <button
          className={styles.vejaMaisMenos}
          onClick={handleShowLess}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Veja menos
        </button>
      </div>
    </>
  ) : (
    <div className={styles.vejaMaisMenosContainer}>
      <p
        className={styles.vejaMaisMenos}
        onClick={handleShowProjects}
        style={{ color: "blue", cursor: "pointer" }}
      >
        Veja mais
      </p>
    </div>
          )}
        </div>

        <p className={styles.contato}>Telefone: (31) 986132070</p>
        <p className={styles.contato}>E-mail: guilherme.gomes.ti1@gmail.com</p>
        <p className={styles.contato}>
          GitHub: https://github.com/GuilhermeGomesti1
        </p>
        <p className={styles.contato}>
          LinkedIn: https://www.linkedin.com/in/guilherme-gomes-427321238
        </p>
      </div>
    </>
  );
};

export default SobreMim;
