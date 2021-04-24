import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {
    const currentDate = format(new Date(), 'EEEE, d MMMM', {
        locale: ptBR
    })

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir, sempre   </p>
            <br></br> 
            <a href="https://app.rocketseat.com.br/me/alissondeandradearaujo">Rocketseat >  </a>
            <br></br>
            <br></br>
            <a href="https://github.com/alissonandrade2020">Github</a>

            <span>{currentDate}</span>
        </header>
    )
}