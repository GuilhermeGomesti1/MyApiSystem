import React from "react";
import Head from "next/head";
import styles from "./styles.module.css";
import Header from "@/components/header/header";

const SobreMim: React.FC = () => {
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

        <p className={styles.descricao}>
          Sou Guilherme Gomes, um desenvolvedor frontend apaixonado por
          programação e fascinado pelo poder de transformação da tecnologia.
          Atualmente, estudo Análise e Desenvolvimento de Sistemas e concentro
          meus esforços no desenvolvimento front-end.
        </p>

        <h2 className={styles.subtitulo}>Experiência Profissional:</h2>

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

        <h2 className={styles.subtitulo}>Projetos Concluídos:</h2>

        <p className={styles.subtitulo}>Healthy-Life-Nutrition:</p>
        <p className={styles.descricao}>
          Desenvolvimento de um site para vendas de ebooks e postagens de dicas
          e receitas, utilizando tecnologias modernas como HTML, SCSS, JS,
          TypeScript e NextJS. Implementei um Sistema de Gestão de Conteúdo para
          permitir que o cliente atualize o conteúdo de forma autônoma. O site é
          responsivo e acessível em todos os dispositivos.
        </p>

        <p className={styles.subtitulo}>Newsystem-Tickets:</p>
        <p className={styles.descricao}>
          Desenvolvimento de uma aplicação com sistema de login completo,
          utilizando Firebase para proteger as informações dos usuários. A
          aplicação permite a adição de clientes e abertura de chamados para
          diferentes tipos de atendimentos, com elementos editáveis e
          responsivos para uma melhor experiência do usuário.
        </p>

        <p className={styles.subtitulo}>Prime-Flix-Filmes:</p>
        <p className={styles.descricao}>
          Uma aplicação que utiliza uma API externa para buscar informações
          sobre os filmes em cartaz no momento. O site exibe detalhes do filme,
          como imagem de cartaz, informações relevantes e trailer do filme
          obtido do Youtube. Os usuários podem adicionar filmes aos favoritos,
          editá-los e visualizar mais detalhes.
        </p>

        <p className={styles.subtitulo}>APIREST:</p>
        <p className={styles.descricao}>
          Desenvolvimento de uma API REST completa, com CRUD de usuários,
          utilizando Node, Express, TypeScript e MongoDB. O deploy da aplicação
          foi realizado no Railway. Durante o desenvolvimento, foram aplicados
          princípios do SOLID, injeção de dependência e o uso do Repository
          Pattern.
        </p>

        <p className={styles.subtitulo}>Favorite-Bands:</p>
        <p className={styles.descricao}>
          Desenvolvimento de uma página com sistema de login que permite aos
          usuários selecionar um estilo musical dentre vários disponíveis e
          adicionar sua banda favorita para o estilo escolhido. O site é
          totalmente responsivo e se adapta a todos os dispositivos.
        </p>

        <h2 className={styles.subtitulo}>Educação:</h2>

        <p className={styles.descricao}>
          Análise e Desenvolvimento de Sistemas na UNIFCV - Centro Universitário
          Cidade Verde (Cursando, EAD)
        </p>
        <p className={styles.descricao}>
          Cursos de HTML5 e CSS3, Curso JavaScript, ReactJS, TypeScript, NextJS
        </p>

        <h2 className={styles.subtitulo}>Habilidades:</h2>

        <p className={styles.descricao}>
          NextJS, TypeScript, SCSS, CSS, HTML, ReactJS, JavaScript, Node.js
          (Front-End)
        </p>

        <h2 className={styles.subtitulo}>Contato:</h2>

        <p className={styles.contato}>Telefone: (31) 986132070</p>
        <p className={styles.contato}>E-mail: guilherme.gomes.ti1@gmail.com</p>
        <p className={styles.contato}>
          GitHub: https://github.com/GuilhermeGomesti1
        </p>
        <p className={styles.contato}>
          LinkedIn: https://www.linkedin.com/in/guilherme-gomes-427321238
        </p>

        <p className={styles.descricao}>
          Será um prazer contribuir com meus conhecimentos e experiência em seus
          projetos!
        </p>
      </div>
    </>
  );
};

export default SobreMim;
