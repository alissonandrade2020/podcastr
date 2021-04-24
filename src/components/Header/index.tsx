import React from "react";
import Link from "next/link";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";

import styles from "./styles.module.scss";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.container}>
      <Link href="/">
        <a title="Podcastr">
          <img src="/img/logo.svg" alt="Podcastr" />
        </a>
      </Link>

      <p>O melhor para você ouvir, sempre</p>

      <span>
        {currentDate} |{" "}
        <a href="https://github.com/iaematt/podcastr" target="_blank">
          GitHub
        </a>
      </span>
    </header>
  );
}
