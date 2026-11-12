import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Header from '../../components/header';
import Layout from '../../components/layout';
import Section from '../../components/section';
import { getAllPosts, formatDate, PostMeta } from '../../lib/posts';

const SITE_URL = 'https://www.seanherbert.me';
const HOME_URL = `${SITE_URL}/`;
const PAGE_URL = `${SITE_URL}/blog`;
const FULL_NAME = 'Sean Herbert';
const PAGE_TITLE = `Blog | ${FULL_NAME}`;
const META_DESCRIPTION =
  'Articles by Sean Herbert on WordPress and PHP plugin development, C#/.NET, Next.js, Supabase and building privacy-first, self-hosted software.';

interface BlogIndexProps {
  posts: PostMeta[];
}

const BlogIndex: React.FC<BlogIndexProps> = ({ posts }) => {
  const published = posts.filter((p) => !p.draft);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${PAGE_URL}#blog`,
        url: PAGE_URL,
        name: `${FULL_NAME} — Blog`,
        description: META_DESCRIPTION,
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
        blogPost: published.map((p) => ({
          '@type': 'BlogPosting',
          '@id': `${SITE_URL}/blog/${p.slug}#article`,
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: HOME_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: PAGE_URL },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="author" content={FULL_NAME} />
        {/* An empty blog is thin content; keep it out of the index until a post is published. */}
        <meta
          name="robots"
          content={published.length ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow'}
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <meta property="og:image:alt" content={`${FULL_NAME} profile photo`} />
        <meta property="og:site_name" content={`${FULL_NAME} — Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Header />
      <Section title="Blog">
        {posts.length === 0 ? (
          <p>No posts yet. Check back soon.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="bg-white/70 dark:bg-gray-900/60 rounded-md p-6 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-800 transition-colors duration-300">
                  <p className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {post.draft && <span className="mr-2 text-primary-700 dark:text-primary-300">[Draft]</span>}
                    {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : 'Undated'}
                    {' · '}
                    {post.readingMinutes} min read
                  </p>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-700 dark:hover:text-primary-300">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{post.description}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => ({
  props: { posts: getAllPosts() },
});

export default BlogIndex;
