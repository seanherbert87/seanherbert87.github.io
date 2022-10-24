import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Layout from '../components/layout';
import Form from '../components/form';

const Index = ({ data }) => {
  
  return (
    <Layout>
        <Head>
            <title>Contact Me | Sean Herbert | Web Developer</title>
            <meta name="description" content="Web Developer" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <Header />
      <Form />
    </Layout>
  );
};

export default Index;
