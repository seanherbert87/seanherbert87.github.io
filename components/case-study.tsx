import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from './header';
import Layout from './layout';
import Section from './section';

const SITE_URL = 'https://www.seanherbert.me';
const FULL_NAME = 'Sean Herbert';

export interface CaseStudyData {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  year: string;
  applicationCategory: string;
  technologies: string[];
  sections: { title: string; paragraphs?: string[]; bullets?: string[] }[];
}

const CaseStudy: React.FC<{ study: CaseStudyData }> = ({ study }) => {
  const url = `${SITE_URL}/projects/${study.slug}`;
  const title = `${study.name} Case Study | ${FULL_NAME}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        headline: `${study.name}: ${study.tagline}`,
        description: study.summary,
        url,
        inLanguage: 'en',
        author: { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: FULL_NAME, url: SITE_URL },
        about: { '@id': `${url}#software` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: study.name,
        description: study.summary,
        applicationCategory: study.applicationCategory,
        author: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: study.name, item: url },
        ],
      },
    ],
  };

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={study.summary} />
        <meta name="author" content={FULL_NAME} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={study.summary} />
        <meta property="og:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <meta property="og:image:alt" content={`${FULL_NAME} profile photo`} />
        <meta property="og:site_name" content={`${FULL_NAME} — Portfolio`} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={study.summary} />
        <meta name="twitter:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <Header />
      <article>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 font-mono text-xs text-primary-700 dark:text-primary-300 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          Back to portfolio
        </Link>
        <div className="mb-12">
          <p className="font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">Case study · {study.year}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3">{study.name}</h2>
          <p className="text-lg font-light text-gray-700 dark:text-gray-300 mb-6">{study.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 border border-primary-200 dark:border-primary-900 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200 rounded-sm font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        {study.sections.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.paragraphs?.map((p) => (
              <p key={p} className="mb-4">{p}</p>
            ))}
            {section.bullets && (
              <ul className="list-disc pl-5 space-y-2 marker:text-primary-600">
                {section.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </Section>
        ))}
      </article>
    </Layout>
  );
};

export default CaseStudy;
