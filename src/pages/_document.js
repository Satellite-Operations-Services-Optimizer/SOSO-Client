import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <link href="/Cesium/Widgets/widgets.css" rel="stylesheet"/>
        <script type="text/javascript" src="/Cesium/Cesium.js"></script>
        <script type="text/javascript" src="/satellite.js"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
