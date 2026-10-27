import React from 'react';
import CaseStudy, { CaseStudyData } from '../../components/case-study';

const study: CaseStudyData = {
  slug: 'pixelvault',
  name: 'PixelVault',
  tagline: "A self-hosted, privacy-first photo and video organizer.",
  summary:
    "PixelVault is a self-hosted photo and video organizer built on ASP.NET Core (.NET 10), with albums, hierarchical tags, duplicate detection and non-destructive editing. All media stays on the owner's hardware.",
  year: '2026',
  applicationCategory: 'MultimediaApplication',
  technologies: ['C#', '.NET 10', 'ASP.NET Core', 'Tailscale', 'ffmpeg'],
  sections: [
    {
      title: 'Overview',
      paragraphs: [
        "PixelVault is a photo and video organizer designed around one rule: everything stays on the owner's own hardware. There is no cloud account and no third-party storage. It is delivered as an ASP.NET Core service with web, desktop and mobile clients.",
        'The project is private, so this page describes the design rather than linking to a public repository or demo.',
      ],
    },
    {
      title: 'What it does',
      bullets: [
        'Albums, hierarchical tags, ratings and captions for organizing a large library.',
        'Perceptual-hash duplicate detection, so near-identical copies are found even when files differ.',
        'Non-destructive editing: originals are preserved.',
        'Photo and video support, with ffmpeg handling video processing.',
      ],
    },
    {
      title: 'Security and privacy',
      bullets: [
        'Signed media URLs, so media cannot be fetched without a valid link.',
        'Argon2id password hashing and mandatory TOTP two-factor authentication.',
        'A PIN-gated private area for sensitive items.',
        'Secure remote access over Tailscale, so the service does not need to be exposed to the public internet.',
      ],
    },
    {
      title: 'Technology',
      paragraphs: [
        'The server is built with C# on .NET 10 and ASP.NET Core. Clients for web, desktop and mobile all talk to the same service, which keeps the library logic in one place.',
      ],
    },
  ],
};

export default function PixelVaultCaseStudy() {
  return <CaseStudy study={study} />;
}
