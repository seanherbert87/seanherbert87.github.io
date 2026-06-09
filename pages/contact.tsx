import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Layout from '../components/layout';
import Form from '../components/form';

const SITE_URL = 'https://seanherbert.me';
const PAGE_URL = `${SITE_URL}/contact`;
const PAGE_TITLE = 'Contact Sean Herbert | PHP, WordPress & C#/.NET Developer';
const META_DESCRIPTION = 'Get in touch with Sean Herbert, a senior PHP, WordPress & C#/.NET developer with 15+ years of experience. Available for WordPress 7, WooCommerce, .NET 10, PostgreSQL, Supabase & full-stack web projects.';

const Contact: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="author" content="Sean Herbert" />
        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <meta property="og:image:alt" content="Sean Herbert profile photo" />
        <meta property="og:site_name" content="Sean Herbert — Portfolio" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/profile-photo.jpg`} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Form />
    </Layout>
  );
};

export default Contact;
