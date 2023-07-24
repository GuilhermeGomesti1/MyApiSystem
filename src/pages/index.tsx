import Head from 'next/head'

import styles from '@/styles/Home.module.css';
import LoginForm from './login';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>APi</title>
       
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <h1>hello world</h1>
        <LoginForm/>
        
        <Link href="/signup" passHref>
  <button>Signup</button>
</Link>
        <div>
         
        </div>
      </main>
    </>
  )
}
