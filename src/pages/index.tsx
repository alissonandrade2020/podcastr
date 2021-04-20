import React from "react";

export default function Home(props) {
  return <>{/* <p>{JSON.stringify(props.episodes)}</p> */}</>;
}

// SSR - Server Side Rendering
// export async function getServerSideProps() {
//   const response = await fetch("http://localhost:3333/episodes");
//   const data = await response.json();

//   return {
//     props: {
//       episodes: data,
//     },
//   };
// }

// export async function getStaticProps() {
//   const response = await fetch("http://localhost:3333/episodes");
//   const data = await response.json();

//   return {
//     props: {
//       episodes: data,
//     },
//     revalidate: 60 * 60 * 8,
//   };
// }
