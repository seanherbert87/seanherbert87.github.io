import Head from 'next/head';
import Header from '../components/header';
import Layout from '../components/layout';
import SectionAbout from '../components/section-about';
import SectionExperience from '../components/section-experience';
import SectionProjects from '../components/section-projects';
import SectionSkills from '../components/section-skills';

export default function Home() {

  const about = `Hi, I'm Sean. I'm a web developer skilled in PHP, C#, and front-end technologies like JavaScript, jQuery, and React. I excel in WordPress and Laravel for CMS development and have experience with e-commerce platforms such as NopCommerce and WooCommerce.`;
  const projects = null /*[
    {
      name: 'TBD',
      description: 'TBD',
      link: '#'
    }
  ]*/;
  const experience = [
    {
      name: 'Blackbird Digital Inc.',
      description: 'Director of Technology, May 2012 - Present',
      link: 'https://www.blackbird-digital.com',
    },
    {
      name: 'LazerMaxx',
      description: 'Web Developer / Graphic Designer / Technician / Manager, January 2010 - June 2012',
      link: 'https://www.lazermaxx.com',
    }
  ];
  const skills = [
    {
      name: 'Languages & Frameworks',
      description:
        'PHP, C#, ASP.Net, JavaScript, Typescript, jQuery, React, NextJS, Ionic, Symfony, Laravel, CodeIgniter, NopCommerce, WooCommerce',
    },
    {
      name: 'Databases',
      description: 'MySQL, MariaDB, MS SQL, NoSQL, Firebase Realtime Database, Firebase Firestore',
    },
    {
      name: 'Other',
      description:
        'Azure DevOps, Microsoft Teams, CI / CD, Microservices, Firebase Auth',
    },
  ];

  return (
    <Layout>
      <Head>
        <title>Sean Herbert | Web Developer</title>
        <meta name="description" content="Web Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {about && <SectionAbout about={about} />}
      {projects && projects.length && <SectionProjects projects={projects} />}
      {experience && experience.length && (
        <SectionExperience experience={experience} />
      )}
      {skills && skills.length && <SectionSkills skills={skills} />}
    </Layout>
  )
}
