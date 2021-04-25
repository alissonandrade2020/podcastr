// Este arquivo serve para qualquer url no formato:
// /episode/ ...

// as reticências referenciam o nome do episódio, e para 
// acessá-las usa-se o useRouter com router.query.nomeDoArquivo


import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { usePlayer } from '../../contexts/PlayerContext';
import convertDurationToTimeString from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss'; 


type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  const {play } = usePlayer();

  return(
    <div className={styles.episode}>
      
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar"/>
          </button>
        </Link>
        <Image 
          width={700} 
          height={160} 
          src={episode.thumbnail} 
          objectFit="cover" 
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio"/>
        </button>
      </div>
      
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{ __html: episode.description }} 
      />
    </div>
  )
}

// Toda rota que usar esse modelo com colchete precisa informar
// este método  ###############################################
export const getStaticPaths: GetStaticPaths = async () => {

  // Busca os episódios mais acessados, por exemplo os 2 últimos
  // definido os episódios, geramos a página estática para ficar armazenado em cache.
  // O comportamento esperado é que as páginas tenham o delay (definido no 
  // script 'server' do arquivo package.json), com exceção das páginas
  // definidas aqui \/
  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const paths = data.map(episode => {
    return {
      params: {
        epNumber: episode.id
      }
    }
  })
  // -------------------------------------------------------------------------------

  return{
    paths,

    // incremental static regeneration
    // fallback: true  ->  habilita uma página intermediária de carregamento
    // fallback: 'blocking'  -> o usuário só é redirecionado quando a página destino
    // estiver carregada
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { epNumber } = ctx.params
  const { data } = await api.get(`/episodes/${epNumber}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return{
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,  // 24 horas
  }
}