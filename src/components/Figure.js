import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";

const Figure = ({ node, id }) => {

	const data = useStaticQuery(graphql`
query {
  allSanityLinkedImage {
    edges {
      node {
				_id
        mainImage {
          asset {
            _id
          }
        }
        imageAlt
      }
    }
  }
}
	`)

	const imageObj = node &&
				data.allSanityLinkedImage.edges.filter( linkedImage => (
		linkedImage.node._id === node._ref
				));

	const imageRef = node ? imageObj[0].node.mainImage.asset._id : id;

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
