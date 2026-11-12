import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/header';
import Layout from '../../components/layout';
import { getPost, getPostSlugs, formatDate, Post } from '../../lib/posts';

const SITE_URL = 'https://www.seanherbert.me';
const HOME_URL = `${SITE_URL}/`;
const FULL_NAME = 'Sean Herbert';

interface BlogPostProps {
  post: Post;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | ${FULL_NAME}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        inLanguage: 'en',
        ...(post.date ? { datePublished: post.date } : {}),
        ...(post.updated || post.date ? { dateModified: post.updated ?? post.date } : {}),
        keywords: post.tags.join(', '),
        image: `${SITE_URL}/profile-photo.jpg`,
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: FULL_NAME, url: HOME_URL },
        publisher: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/blog#blog` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: HOME_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.description} />
        <meta name="author" content={FULL_NAME} />
        <meta
          name="robots"
          content={post.draft ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        {post.date && <meta property="article:published_time" content={post.date} />}
        {post.updated && <meta property="article:modified_time" content={post.updated} />}
        <meta property="article:author" content={HOME_URL} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <meta property="og:image:alt" content={`${FULL_NAME} profile photo`} />
        <meta property="og:site_name" content={`${FULL_NAME} — Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Header />
      <article>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-primary-700 dark:text-primary-300 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          All posts
        </Link>
        <header className="mb-10">
          <p className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">
            {post.draft && <span className="mr-2 text-primary-700 dark:text-primary-300">[Draft]</span>}
            {post.date ? <time dateTime={post.date}>{formatDate(post.date)}</time> : 'Undated'}
            {' · '}
            {post.readingMinutes} min read · By{' '}
            <Link href="/" rel="author" className="text-primary-700 dark:text-primary-300 hover:underline">
              {FULL_NAME}
            </Link>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">{post.title}</h2>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-sm font-mono text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getPostSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<BlogPostProps> = async ({ params }) => ({
  props: { post: getPost(String(params?.slug)) },
});

export default BlogPost;
