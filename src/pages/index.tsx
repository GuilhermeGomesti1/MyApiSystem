import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import LoginForm from './signin/login'
import SignUp from './signup/signup'


export default function Home() {
  return (
    <>
      <Head>
        <title>APi</title>
       
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LoginForm/>
        <SignUp/>
        <div>
          <h1>hello world</h1>
        </div>
      </main>
    </>
  )
}
