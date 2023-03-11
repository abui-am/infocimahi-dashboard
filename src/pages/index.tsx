import { Paper } from '@mantine/core';
import { type NextPage } from 'next';
import Head from 'next/head';

import SocMed from '@/components/form/SocMed';
import MainLayout from '@/components/layouts/MainLayout';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Social Media</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainLayout>
          <Paper className="p-8">
            <h2 className="font-bold">Social Media Count</h2>
            <SocMed />
          </Paper>
        </MainLayout>
      </main>
    </>
  );
};

export default Home;
