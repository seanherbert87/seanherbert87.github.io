exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type SiteSiteMetadata {
      siteUrl: String
      name: String
      title: String
      description: String
      author: String
      github: String
      linkedin: String
      about: String
      projects: [SectionItem]
      experience: [SectionItem]
      skills: [SectionItem]
    }

    type SectionItem {
      name: String!
      description: String!
      link: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }
    
    type Fields {
      slug: String
    }
  `;
  createTypes(typeDefs);
};
