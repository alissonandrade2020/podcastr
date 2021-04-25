import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './styles.module.scss';

export function Header() {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  })

  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="Podcastr"/>

      <p>O melhor para você ouvir, sempre |<a href="https://github.com/alissonandrade2020">GitHub</a></p>

      <span>{currentDate}</span>
    </header>
  );
}