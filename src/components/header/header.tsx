
import styles from "./styles.module.css";
import React from "react";
import Link from "next/link";
import { HomeIcon } from "../icons/HomeIcon";
import { SobreMimIcon} from "../icons/SobreMimIcon";
import { SobreProjeto } from "../icons/SobreProjeto";

const Header = () => {
  return (
    <header className={styles.header}>
      
       <img className={styles.logo} src="/icon.png" alt="Logo" />
       <h2 className={styles.headerh2}>Tasks</h2>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
        <li className={styles.navItem}>
            <Link href="/"> <HomeIcon/>Página Inicial</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/sobre-mim"> <SobreMimIcon/>Sobre Mim</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/sobre-o-projeto"><SobreProjeto/>Sobre o Projeto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
