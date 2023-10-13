import Head from 'next/head';
import Header from './components/header';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Satellite Operations Service Optimizer</title>
        <meta name="description" content="Your description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      {/* Your page content goes here */}
    </div>
  );
};

export default Home;
