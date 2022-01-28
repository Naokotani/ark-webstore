import React from 'react'
import {useStaticQuery, graphql} from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Figure = ({ node }) => {
	const imageRef = "image-fdab30ca58f3a081d8dbc11652701410229791a3-1321x540-png";

const data =useStaticQuery(graphql`
query ImageQuery($imageRef: String) {
		sanityImageAsset(id: {eq: $imageRef}) {
				gatsbyImageData
		}
}
`)

	console.log(data.sanityImageAsset.gatsbyImageData)
	

	const image = getImage(data.sanityImageAsset.gatsbyImageData)
	console.log(node);

	return (
		< figure >
			<GatsbyImage image={image} alt={node.alt} />
			<figcaption>{node.caption}</figcaption>
		</figure>
	)
}

export default Figure;

