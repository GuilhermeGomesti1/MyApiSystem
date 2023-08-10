import Head from "next/head";

import styles from "@/styles/Home.module.css";
import LoginForm from "./login";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';


export default function Home() {
  return (
    <>
      <Head>
        <title>Sign-in / Sign-up</title>
        <link rel="icon" href="/icon.ico" />
      </Head>
      <div className={styles.allContent}>
      
        <Header />
        <main className={styles.main}>
          <div className={styles.titleAndImage}>
            <h1 className={styles.textHome}>
              CRIE E ORGANIZE SUAS TAREFAS COM FACILIDADE
            </h1>
            <img className={styles.image} src="/imagemHome.png" alt="Logo da aplicação" />
          </div>

          <div className={styles.formContainer}>
            <LoginForm />
            <Link href="/signup" passHref>
              <button
                className={`${styles.buttonSignUp} ${styles.buttonSignUpSignup}`}
              >
                Não possui uma conta? Cadastre-se
              </button>
            </Link>
          </div>
        
        </main>
        <Footer />
        <ToastContainer />
      </div>
     
    </>
  );
}
