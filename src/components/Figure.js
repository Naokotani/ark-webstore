import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";

const Figure = ({ node, id }) => {
  console.log(id);
  const imageRef = node ? node.asset._ref : id;
  console.log(imageRef);

  const sanityConfig = { projectId: "3u2gq4se", dataset: "tbt" };

  const image = getGatsbyImageData(imageRef, { maxWidth: 1024 }, sanityConfig);

  return (
    <figure>
      <GatsbyImage image={image} alt="foo" />
      {node && <figcaption>{node.caption}</figcaption>}
    </figure>
  );
};

export default Figure;
