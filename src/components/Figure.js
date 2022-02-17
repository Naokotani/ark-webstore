import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from 'gatsby-source-sanity'

const Figure = ({ node }) => {

	console.log(node)
	const imageRef = !node.asset ?
				node.mainImage.asset._id:
				node.asset._ref

	const sanityConfig = { projectId: '3u2gq4se', dataset: 'tbt' }

	const image = getGatsbyImageData(imageRef, { maxWidth: 1024 }, sanityConfig)

	return (
		<figure>
			<GatsbyImage image={image} alt='foo' />
			<figcaption>{node.caption}</figcaption>
		</figure>
	)
}

export default Figure;

