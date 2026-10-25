import Head from 'next/head';
import React, { memo, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/header';
import Layout from '../components/layout';
import { Project, Experience, Skill } from '../types';

const SectionAbout = dynamic(() => import('../components/section-about'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>
});
const SectionProjects = dynamic(() => import('../components/section-projects'), {
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
const META_DESCRIPTION = 'Senior full-stack developer with 15+ years in PHP, WordPress 7, C#/.NET 10, React & TypeScript. Expert in WooCommerce, ASP.NET Core, PostgreSQL, Supabase & modern web development.';

const Home: React.FC = memo(() => {
  const about = useMemo(() =>
    `Hi, I'm Sean Herbert, a senior full-stack web developer with over ${new Date().getFullYear() - 2011} years of experience specializing in PHP, WordPress, C#/.NET, and modern JavaScript frameworks. I excel at building high-performance websites and web applications — from custom WordPress and WooCommerce solutions to enterprise-grade C#/.NET 10 applications using ASP.NET Core. My expertise spans custom WordPress theme and plugin development, PHP application architecture, C#/.NET application development, database optimization, and creating seamless user experiences. Recently I've been building privacy-first, self-hosted products: WordPress plugins that run entirely from a site's own server, a .NET-powered media organizer, and a cross-platform health tracker on Next.js, Supabase, and Flutter. I'm passionate about clean code, performance optimization, and delivering scalable solutions that drive business results. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring fellow developers.`,
    []
  );

  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      name: 'WP Local Consent',
      description: 'A WordPress cookie consent plugin and script blocker that renders entirely from the site\'s own assets, with no third-party domain calls. The banner ships under 10 KB of JavaScript, fires Google Consent Mode v2 signals, and is backed by a measured performance benchmark, Lighthouse CI size budgets, and a security review of the consent log. Includes agency and multi-site tooling and a Pro companion plugin.',
      link: 'https://wplocalconsent.com',
      technologies: ['PHP', 'WordPress', 'JavaScript', 'Lighthouse CI', 'GitHub Actions'],
      featured: true,
      year: '2026',
    },
    {
      id: 2,
      name: 'WP Local Accessibility',
      description: 'A WordPress accessibility toolkit that runs entirely on the site\'s own server: a visitor-facing toolbar, an on-site accessibility scanner, and an auto-generated accessibility statement. No CDN assets, no third-party audit APIs, and no telemetry. Shipped with its own brand system and a static brochure site.',
      link: 'https://wplocalaccessibility.com',
      technologies: ['PHP', 'WordPress', 'JavaScript', 'WCAG', 'Netlify'],
      featured: true,
      year: '2026',
    },
    {
      id: 3,
      name: 'PixelVault',
      description: 'A self-hosted, privacy-first photo and video organizer with albums, hierarchical tags, ratings, captions, perceptual-hash duplicate detection, and non-destructive editing. Everything stays on the owner\'s hardware, with signed media URLs, Argon2id and mandatory TOTP authentication, a PIN-gated private area, and secure remote access over Tailscale. Delivered as an ASP.NET Core service with web, desktop, and mobile clients.',
      technologies: ['C#', '.NET 10', 'ASP.NET Core', 'Tailscale', 'ffmpeg'],
      featured: true,
      caseStudy: true,
      year: '2026',
    },
    {
      id: 4,
      name: 'MedTrack',
      description: 'A personal medication efficacy tracker for logging mood, efficacy, dosage, and side effects, with reports that compare treatments over time. A Next.js web app on Supabase (PostgreSQL, auth, and sync) shares business logic with native Flutter apps for iOS, Android, macOS, and Windows.',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Flutter'],
      featured: true,
      caseStudy: true,
      year: '2026',
    },
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
      description: 'PHP 8.x, WordPress 7.x, Custom Theme Development, Plugin Development, WooCommerce, Advanced Custom Fields (ACF), WordPress REST API, Custom Post Types, WordPress Multisite, Performance Optimization, Security Hardening',
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
      description: 'PHP, Laravel, Node.js, Express.js, C#/.NET, MySQL, MariaDB, MSSQL, SQL Server, PostgreSQL, Supabase, Redis, RESTful APIs, GraphQL, Serverless Functions, Google Firebase, Database Design & Optimization',
    },
    {
      name: 'Mobile & Cross-Platform',
      description: 'Flutter, Dart, shared business logic across web, iOS, Android, macOS and Windows, Supabase auth & sync',
    },
    {
      name: 'Cloud & DevOps',
      description: 'WP Engine, Vercel, Netlify, Docker, Tailscale, Git, GitHub Actions, CI/CD, Lighthouse CI, Jest, ESLint, Prettier, Webpack, Vite, Performance Monitoring',
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
      'React', 'TypeScript', 'Next.js', 'JavaScript', 'MySQL', 'PostgreSQL', 'Supabase', 'Laravel', 'Node.js', 'Flutter', 'Docker',
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
        <meta name="keywords" content="PHP developer, WordPress developer, WordPress 7, C# developer, .NET developer, ASP.NET Core, .NET 10, PostgreSQL, Supabase, full-stack developer, React developer, TypeScript, WooCommerce, custom WordPress themes, WordPress plugins, Laravel, MySQL, JavaScript, Next.js, Flutter, WordPress plugin developer, cookie consent, web accessibility" />
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
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded-lg mb-8"></div>}>
        {projects.length > 0 && <SectionProjects projects={projects} />}
      </Suspense>
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
