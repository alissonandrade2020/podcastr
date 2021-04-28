// ARQUIVO QUE FICA EM TORNO DE TODA A APLICAÇÃO

// INSERIR AQUI COMPONENTES QUE ESTARÁ PRESENTE EM TODAS AS PÁGINAS
// DA APLICAÇÃO

import '../styles/global.scss';

import { useState } from 'react';

import { Header } from '../components/Header';
import { Player } from '../components/Player';

import styles from '../styles/app.module.scss';

import { PlayerContextProvider } from '../contexts/PlayerContext';

function MyApp({ Component, pageProps }) {
    return(
      <PlayerContextProvider>
        <div className={styles.wrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
  );
}

export default MyApp


// PlayerContext -> Todos os componentes dentro da tag <PlayerContext> possuem acesso
// às informações contidas nele