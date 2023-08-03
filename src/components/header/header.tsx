
import styles from "./styles.module.css";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
        <li className={styles.navItem}>
            <Link href="/">Página Inicial</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/sobre-mim">Sobre Mim</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/sobre-o-projeto">Sobre o Projeto</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
