import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Mejeng</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/mejeng-icon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
