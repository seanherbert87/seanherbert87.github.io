import { Html, Head, Main, NextScript } from 'next/document';

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Cookieless Umami analytics, proxied through /stats by netlify.toml so no third-party
            domain is contacted. Only rendered when the website ID is set at build time, and
            data-domains limits recording to the production host. */}
        {UMAMI_WEBSITE_ID && (
          <script
            defer
            src="/stats/script.js"
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="www.seanherbert.me"
          />
        )}
      </Head>
      <body>
        {/* Inline script prevents dark-mode flash before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark')})()`,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
