import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {getGatsbyImageData} from 'gatsby-source-sanity'

const Figure = ({ node }) => {

	const imageRef = node.asset._ref

	const sanityConfig = {projectId: '3u2gq4se', dataset: 'tbt'}

	const image = getGatsbyImageData(imageRef, {maxWidth: 1024}, sanityConfig)

	return (
		< figure >
			<GatsbyImage image={image} alt='foo' />
			<figcaption>{node.caption}</figcaption>
		</figure>
	)
}

export default Figure;

