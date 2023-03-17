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

      <section className="flex flex-col items-center justify-center pb-14">
        <h1 className="pb-3 text-5xl font-extrabold text-primary">
          Find Creative Inspiration
        </h1>
        <h3 className="text-2xl font-semibold text-secondary">
          Your Brilliant Design Ideas
        </h3>
      </section>
      <section className="flex items-center justify-center">
        <div className="flex flex-col">
          <h2 className="text-[40px] font-bold text-secondary">
            Mobile Design
          </h2>
          <p className="w-3/5 text-xl">
            Mobile design innovation for a changing world
          </p>
        </div>
        <div className="flex items-center justify-center gap-10">
          <div className="h-60 w-[297px] bg-slate-400"></div>
          <div className="h-60 w-[297px] bg-slate-400"></div>
          <div className="h-60 w-[297px] bg-slate-400"></div>
        </div>
      </section>
    </>
  );
}
