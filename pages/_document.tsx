import React from "react";
import Document, { Main, Head, NextScript, Html } from "next/document";

export default class __Document__ extends Document {
  render() {
    const isDEV = process.env.NODE_ENV === "development";

    return (
      <Html>
        <Head>
          {!isDEV && (
            <script
              defer
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-NRDDH4Q');`,
              }}
            />
          )}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
