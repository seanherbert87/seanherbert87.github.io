module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://www.seanherbert.me`,
    // Your Name
    name: 'Sean Herbert',
    // Main Site Title
    title: `Sean Herbert | Web Developer`,
    // Description that goes under your name in main bio
    description: `Web Developer`,
    // Optional: Twitter account handle
    author: ``,
    // Optional: Github account URL
    github: `https://github.com/seanherbert87/`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/seanmherbert/`,
    // Content of the About Me section
    about: `Hi, I'm Sean. I'm a Web Developer that specializes in custom development. I love learning new things as well as working with others toward a common goal. Let's get started building something great!`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: null, /*[
      {
        name: 'TBD',
        description: 'TBD',
        link: '#'
      }
    ]*/
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'VisionFriendly.com',
        description: 'Director of Technology, May 2012 - Present',
        link: 'https://www.visionfriendly.com',
      },
      {
        name: 'LazerMaxx',
        description: 'Web Developer / Graphic Designer / Technician / Manager, January 2010 - June 2012',
        link: 'https://www.lazermaxx.com',
      }
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Languages & Frameworks',
        description:
          'PHP, C#, ASP.Net, JavaScript, jQuery, React, NextJS, Ionic, Symfony, Laravel, CodeIgniter, NopCommerce, WooCommerce',
      },
      {
        name: 'Databases',
        description: 'MySQL, MariaDB, MS SQL, NoSQL',
      },
      {
        name: 'Other',
        description:
          'Azure DevOps, Microsoft Teams, CI / CD, Microservices',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-6CWHXM7GH2`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `seanherbert`,
        short_name: `seanherbert`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
