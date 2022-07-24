import * as React from 'react';
import Layout from '../components/Layout'
import Figure from '../components/Figure'
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";

const Human = ({ pageContext }) => {

  const human = pageContext;

  return (
    <Layout>
      <article className="page">
        <h1>{human.title}</h1>
        <Figure id={human.imageId} classProp="page-image" />
        <BlockContent serializers={serializers} blocks={human.body} />
      </article>
    </Layout>
  )
}

export default Human;
