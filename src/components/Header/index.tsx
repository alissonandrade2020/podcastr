import Link from 'next/link'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './styles.module.scss'

export function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    })
    return (
        <header className={styles.headerContainer}>
            <Link href="/">
                <a>
                    <img src='/logo.svg' alt="podcastr" />
                </a>
            </Link>
            <p className={styles.slogan}>O melhor para você ouvir, sempre</p>
            <span>{currentDate}</span>
        </header>
    )
}