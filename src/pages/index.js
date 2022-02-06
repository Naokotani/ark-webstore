import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from 'gatsby-source-sanity'
import './index.css'
import Layout from '../components/Layout';


const HomePage = () => {

	const imageRef = 'image-8accacab0215cf8dbc689dcd9882b1e9908fb40f-225x300-jpg'

	const sanityConfig = { projectId: '3u2gq4se', dataset: 'tbt' }

	const image = getGatsbyImageData(imageRef, { maxWidth: 1024 }, sanityConfig)

	return (
		<Layout>
		</Layout>
	)
}

export default HomePage;
