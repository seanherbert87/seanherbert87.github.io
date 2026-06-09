import Head from 'next/head';
import React, { memo, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/header';
import Layout from '../components/layout';
import { Project, Experience, Skill } from '../types';

const SectionAbout = dynamic(() => import('../components/section-about'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>
});
const SectionExperience = dynamic(() => import('../components/section-experience'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>
});
const SectionSkills = dynamic(() => import('../components/section-skills'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>
});

const SITE_URL = 'https://seanherbert.me';
const FULL_NAME = 'Sean Herbert';
const JOB_TITLE = 'Senior PHP, WordPress & C#/.NET Developer';
const META_DESCRIPTION = 'Senior full-stack web developer with 15+ years specializing in PHP, WordPress, C#/.NET, React, and TypeScript. Expert in custom WordPress development, WooCommerce, .NET 10 applications, and modern JavaScript frameworks.';

const Home: React.FC = memo(() => {
  const about = useMemo(() =>
    `Hi, I'm Sean Herbert, a senior full-stack web developer with over ${new Date().getFullYear() - 2011} years of experience specializing in PHP, WordPress, C#/.NET, and modern JavaScript frameworks. I excel at building high-performance websites and web applications — from custom WordPress and WooCommerce solutions to enterprise-grade C#/.NET 10 applications using ASP.NET Core. My expertise spans custom WordPress theme and plugin development, PHP application architecture, C#/.NET application development, database optimization, and creating seamless user experiences. I'm passionate about clean code, performance optimization, and delivering scalable solutions that drive business results. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring fellow developers.`,
    []
  );

  const projects: Project[] = useMemo(() => [
    /*{
      id: 1,
      name: 'Custom WordPress E-Commerce Solution',
      description: 'A high-performance WooCommerce-based e-commerce platform with custom PHP plugins, advanced product filtering, payment gateway integration, and mobile-responsive design. Achieved 40% faster page load times through database optimization and caching strategies.',
      link: 'https://github.com/seanherbert87/wordpress-ecommerce',
      githubLink: 'https://github.com/seanherbert87/wordpress-ecommerce',
      technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL'],
      featured: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Headless WordPress with React Frontend',
      description: 'A modern decoupled architecture using WordPress as a headless CMS with a React/Next.js frontend. Features include custom REST API endpoints, real-time content updates, and TypeScript integration for enhanced developer experience.',
      link: 'https://github.com/seanherbert87/headless-wordpress-react',
      githubLink: 'https://github.com/seanherbert87/headless-wordpress-react',
      technologies: ['WordPress', 'React', 'Next.js', 'TypeScript'],
      featured: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }*/
  ], []);

  const experience: Experience[] = useMemo(() => [
    {
      company: 'Blackbird Digital Inc.',
      position: 'Director of Technology, May 2012 - Present',
      description: 'Leading technology initiatives and driving digital transformation across multiple client projects. Specializing in WordPress development, custom PHP applications, WooCommerce implementations, C#/.NET 10 application development using ASP.NET Core, and modern JavaScript frameworks. Managed teams and delivered scalable solutions for enterprise clients.',
      website: 'https://www.blackbird-digital.com',
    },
    {
      company: 'LazerMaxx',
      position: 'Web Developer / Graphic Designer / Technician / Manager, January 2010 - June 2012',
      description: 'Developed and maintained WordPress websites, custom PHP applications, and e-commerce solutions. Managed technical operations, provided comprehensive support across multiple business functions, and implemented performance optimizations.',
    }
  ], []);

  const skills: Skill[] = useMemo(() => [
    {
      name: 'PHP & WordPress Development',
      description: 'PHP 8.x, WordPress 6.x, Custom Theme Development, Plugin Development, WooCommerce, Advanced Custom Fields (ACF), WordPress REST API, Custom Post Types, WordPress Multisite, Performance Optimization, Security Hardening',
    },
    {
      name: 'C# & .NET Development',
      description: 'C# 12/13, .NET 10, ASP.NET Core, Web API, Entity Framework Core, Blazor, Razor Pages, Minimal APIs, LINQ, Dependency Injection, xUnit, Azure App Service, SQL Server',
    },
    {
      name: 'Modern Frontend Development',
      description: 'React 19, Next.js 16, TypeScript, JavaScript (ES6+), HTML5, CSS3, Responsive Design',
    },
    {
      name: 'Backend & Database Technologies',
      description: 'PHP, Laravel, Node.js, Express.js, C#/.NET, MySQL, MariaDB, MSSQL, SQL Server, Redis, RESTful APIs, GraphQL, Serverless Functions, Google Firebase, Database Design & Optimization',
    },
    {
      name: 'Cloud & DevOps',
      description: 'WP Engine, Vercel, Netlify, Git, GitHub Actions, CI/CD, Jest, ESLint, Prettier, Webpack, Vite, Performance Monitoring',
    },
  ], []);

  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FULL_NAME,
    jobTitle: JOB_TITLE,
    description: META_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/profile-photo.jpg`,
    sameAs: [
      'https://github.com/seanherbert87/',
      'https://www.linkedin.com/in/seanmherbert/',
    ],
    knowsAbout: [
      'PHP', 'WordPress', 'WooCommerce', 'C#', '.NET', 'ASP.NET Core',
      'React', 'TypeScript', 'Next.js', 'JavaScript', 'MySQL', 'Laravel', 'Node.js',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Blackbird Digital Inc.',
      url: 'https://www.blackbird-digital.com',
    },
  }), []);

  return (
    <Layout>
      <Head>
        <title>{`${FULL_NAME} | ${JOB_TITLE}`}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="keywords" content="PHP developer, WordPress developer, C# developer, .NET developer, ASP.NET Core, .NET 10, full-stack developer, React developer, TypeScript, WooCommerce, custom WordPress themes, WordPress plugins, Laravel, MySQL, JavaScript, Next.js" />
        <meta name="author" content={FULL_NAME} />
        <link rel="canonical" href={SITE_URL} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={`${FULL_NAME} | ${JOB_TITLE}`} />
        <meta property="og:description" content={META_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_URL}/profile-photo.jpg`} />
        <meta property="og:image:alt" content={`${FULL_NAME} profile photo`} />
        <meta property="og:site_name" content={`${FULL_NAME} — Portfolio`} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter / X Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${FULL_NAME} | ${JOB_TITLE}`} />
        <meta name="twitter:description" content={META_DESCRIPTION} />
        <meta name="twitter:image" content={`${SITE_URL}/profile-photo.jpg`} />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>}>
        {about && <SectionAbout about={about} />}
      </Suspense>
      {/*{projects && projects.length && <SectionProjects projects={projects} />}*/}
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>}>
        {experience && experience.length && (
          <SectionExperience experience={experience} />
        )}
      </Suspense>
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>}>
        {skills && skills.length && <SectionSkills skills={skills} />}
      </Suspense>
    </Layout>
  );
});

Home.displayName = 'Home';

export default Home;
