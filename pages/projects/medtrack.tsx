import React from 'react';
import CaseStudy, { CaseStudyData } from '../../components/case-study';

const study: CaseStudyData = {
  slug: 'medtrack',
  name: 'MedTrack',
  tagline: 'A personal medication efficacy tracker for web and native apps.',
  summary:
    'MedTrack is a personal medication efficacy tracker built with Next.js and Supabase (PostgreSQL), sharing business logic with native Flutter apps for iOS, Android, macOS and Windows.',
  year: '2026',
  applicationCategory: 'HealthApplication',
  technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Flutter'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        'MedTrack helps a person see whether a medication is actually working. It logs mood, efficacy, dosage and side effects, then produces reports that compare treatments over time.',
        'The project is private, so this page describes the design rather than linking to a public repository or demo.',
      ],
    },
    {
      title: 'What it does',
      bullets: [
        'Log mood, efficacy, dosage and side effects.',
        'Reports that compare treatments over time.',
        'Available on the web and as native apps for iOS, Android, macOS and Windows.',
      ],
    },
    {
      title: 'Architecture',
      bullets: [
        'A Next.js and TypeScript web app.',
        'Supabase provides PostgreSQL storage, authentication and sync.',
        'Native Flutter apps share business logic with the web app, so reports behave the same on every platform.',
      ],
    },
  ],
};

export default function MedTrackCaseStudy() {
  return <CaseStudy study={study} />;
}
