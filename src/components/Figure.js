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
				isLink
				URL
				isFloat
        mainImage {
          asset {
            _id
          }
        }
        imageAlt
				center
      }
    }
  }
}
	`)

	function getImageObj() {
		let imageObj = node &&
			data.allSanityLinkedImage.edges.filter(linkedImage => (
				linkedImage.node._id === node._ref
			));

		imageObj = imageObj[0].node

		return imageObj
	}

	function getImage(id) {
		const sanityConfig = { projectId: "3u2gq4se", dataset: "tbt" };

		return getGatsbyImageData(id, { maxWidth: 1024 }, sanityConfig);
	}

	function getImageClass(imageObj) {
		let imageClass = "";
		console.log(imageObj)

		if (imageObj.center === "Yes") {
			imageClass = "center-image"
		}

		if (imageObj.isFloat === "Yes") {
			imageClass = "page-image"
		}

		console.log(imageClass)

		return imageClass
	}


	let imageObj = false;

	if (node) {
		imageObj = getImageObj()
	}

	const image = node ?
		getImage(imageObj.mainImage.asset._id) :
		getImage(id);

	const imageClass = node ? getImageClass(imageObj) : ""





	return (
		<figure className={imageClass}>
			<GatsbyImage image={image} alt="" />
		</figure>
	);
};

export default Figure;
