import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const House = (props) => {
	const data = useStaticQuery(graphql`
    query {
      allSanityHouse {
        edges {
          node {
            _rawBody
            title
            slug {
              current
            }
            mainImage {
              asset {
                _id
                gatsbyImageData
              }
            }
            address
            _id
          }
        }
      }
    }
  `);

	let house;
	data.allSanityHouse.edges.forEach((e) => {
		if (e.node._id === props.node._ref) {
			house = e.node;
		}
	});
	return (
		<article className="house post grid aside-right">
			<section>
				<header className="flex underline">
					<h2>{house.title}</h2>
					<Link to="houses">See All Houses</Link>
				</header>
				<h5>{house.address}</h5>
				<BlockContent blocks={house._rawBody} serializers={serializers} />
			</section>
			<aside className="flex flex-around house-image">
				<Figure id={house.mainImage.asset._id} />
			</aside>
		</article>
	);
};

export default House;
