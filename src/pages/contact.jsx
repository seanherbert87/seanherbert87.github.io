import { graphql } from 'gatsby';
import React from 'react';

import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Index = ({ data }) => {
  
  return (
    <Layout>
      <SEO title="Contact Me" />
      <Header metadata={data.site.siteMetadata} />
      {/* <Form /> */}
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        name
        title
        description
        about
        author
        github
        linkedin
      }
    }
  }
`;
