import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mejeng</title>
        <meta
          name="description"
          content="Mejeng adalah platform untuk para desain creator berbagi karya dan pamer karya!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mejeng-icon.ico" />
      </Head>
      <main>
        <h1 className="text-blue-500 text-5xl">Hello World</h1>
        <Link href="/admin" className="btn">
          SINI
        </Link>
      </main>
    </>
  );
}
