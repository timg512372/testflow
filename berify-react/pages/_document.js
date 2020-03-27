import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import '../styles.less';

//Custom index.HTML document to add the custom stylesheet --> DO NOT RENAME
export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link href="https://js.api.here.com/v3/3.0/mapsjs-ui.css" rel="stylesheet" />

                    <script
                        src="https://js.api.here.com/v3/3.0/mapsjs-core.js"
                        type="text/javascript"
                        charset="utf-8"
                    />
                    <script
                        src="https://js.api.here.com/v3/3.0/mapsjs-service.js"
                        type="text/javascript"
                        charset="utf-8"
                    />
                    <script
                        src="https://js.api.here.com/v3/3.0/mapsjs-mapevents.js"
                        type="text/javascript"
                        charset="utf-8"
                    />
                    <script
                        src="https://js.api.here.com/v3/3.0/mapsjs-ui.js"
                        type="text/javascript"
                        charset="utf-8"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `if (typeof window !== "undefined") {
                                // hacky force https
                                if (window.location.protocol != "https:" && !window.location.href.includes('localhost:')) {
                                    window.location.href = "https:" +  window.location.href.substring(window.location.protocol.length);
                                }
                            }`
                        }}
                    />

                    <link rel="stylesheet" href="/_next/static/style.css" />
                    <link rel="icon" type="image/png" href="/static/logo.png?" />
                    <link
                        rel="stylesheet"
                        media="screen"
                        href="https://fontlibrary.org/face/butler"
                        type="text/css"
                    />
                    <link
                        rel="stylesheet"
                        media="screen"
                        href="https://fontlibrary.org/face/hanken"
                        type="text/css"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Lato:100,400,700"
                        rel="stylesheet"
                    />
                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto:100,400,700"
                        rel="stylesheet"
                    />
                </Head>
                <style jsx global>{`
                    body {
                    }
                `}</style>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
