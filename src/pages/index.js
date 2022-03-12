import * as React from "react";
import Figure from "../components/Figure"
import "./index.css";
import "./carousel.css";
import { graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";

const HomePage = ({ data }) => {
	const page = data.sanityPage;
	const carousel = data.allSanityCarousel;

	console.log(carousel)
	// const imageRef = "image-8accacab0215cf8dbc689dcd9882b1e9908fb40f-225x300-jpg";

	// const sanityConfig = { projectId: "3u2gq4se", dataset: "tbt" };

	// const image = getGatsbyImageData(imageRef, { maxWidth: 1024 }, sanityConfig);

	return (
		<Layout>
			<Carousel
				autoPlay={true}
				interval={5000}
				showStatus={false}
				infiniteLoop={true}
				className="carousel"
			>
				{carousel.edges.map(({ node }) => (
					<div className="carousel">
						<Figure id={node.mainImage.asset._id} />
						<section className="carousel--top-left">
							<h3>{node.name}</h3>
							<p>{node.text}</p>
						</section>
					</div>
				))}
			</Carousel>
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
		allSanityCarousel {
				edges {
				node {
						text
						name
						link {
						_rawSlug
						}
						mainImage {
						asset {
								_id
						}
						}
				}
				}
		}
  }
`;

export default HomePage;
