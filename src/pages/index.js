import Head from "next/head";
import Assignment4 from "./assignment4"; // Importing assignment4.js

export default function Home() {
  return (
    <>
      <Head>
        <title>Citi Bike Visualization</title>
        <meta name="description" content="infovis_ZiyunChen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ margin: 0, padding: 0, backgroundColor: "white" }}>
        {/* Render the Assignment4 component */}
        <Assignment4 />
      </main>
    </>
  );
}