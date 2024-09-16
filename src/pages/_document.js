import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        {/* Add more meta tags for SEO */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
