import Head from "next/head";

import styles from "@/styles/Home.module.css";
import LoginForm from "./login";

import Link from "next/link";
import Footer from "@/components/footer/footer";

export default function Home() {
  
  return (
    <>
      <Head>
        <title>Sign-in / Sign-up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.welcome}>hello world</h1>
        <span className={styles.span}>Gerencia suas tarefas de forma fácil.</span>
        <LoginForm />

        <Link href="/signup" passHref>
          <button className={styles.buttonSignUp}>Não possui uma conta? Cadastre-se</button>
        </Link>
        
        <div></div>
      </main>
      <Footer />
    </>
  );
}
