import * as React from "react";
import Figure from "../components/Figure"
import "./index.css";
import "./carousel.css";
import { graphql, Link } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Layout from "../components/Layout";

const HomePage = ({ data }) => {
	const page = data.sanityPage;
	const carousel = data.allSanityCarousel;

	console.log(carousel)

	const textPosition = (position) => {
		if (position === 'Top Left'){
			return 'carousel--top-left'; 
		}
		if (position === 'Top Right') {
			return 'carousel--top-right';
		}
			
		if (position === 'Bottom Right') {
			return 'carousel--bottom-right';
		}
			
		if (position === 'Bottom Left') {
			return 'carousel--bottom-left';
		}
	}

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
						<Link to={`/${node.link._rawSlug.current}`}>
						<section className={textPosition(node.textPosition)}>
							<h3>{node.name}</h3>
							<p>{node.text}</p>
						</section>
						</Link>
					</div>
				))}
			</Carousel>
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
								textPosition	
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
