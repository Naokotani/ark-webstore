import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";
import "./index.css";
import { graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";

import Layout from "../components/Layout";

const HomePage = ({ data }) => {
  const page = data.sanityPage;
  // const imageRef = "image-8accacab0215cf8dbc689dcd9882b1e9908fb40f-225x300-jpg";

  // const sanityConfig = { projectId: "3u2gq4se", dataset: "tbt" };

  // const image = getGatsbyImageData(imageRef, { maxWidth: 1024 }, sanityConfig);

  return (
    <Layout>
      <h1>{page.title}</h1>
      <BlockContent blocks={page._rawBody} serializers={serializers} />
    </Layout>
  );
};

export const query = graphql`
  query {
    sanityPage(slug: { current: { eq: "l-arche-cape-breton" } }) {
      _rawBody
      title
    }
  }
`;

export default HomePage;
