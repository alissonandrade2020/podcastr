import React from "react";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";

import "@styles/global.scss";
import styles from "@styles/app.module.scss";

import { Header } from "@components/Header";
import { Player } from "@components/Player";
import { PlayerContextProvider } from "@contexts/PlayerContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <Head>
          <title>Podcastr</title>

          <link rel="stylesheet" type="text/css" href="/css/nprogress.css" />
        </Head>

        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
