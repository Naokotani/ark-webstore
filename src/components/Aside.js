import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import Figure from "./Figure"

const Aside = (props) => {

	const data = useStaticQuery(graphql`
query {
  allSanityAside {
    edges {
      node {
        _id
        _rawBody
        mainImage {
          asset {
            _id
          }
        }
        showHeading
				title
        imagePosition
        imageAlt
      }
    }
  }
}
	`)

	const asideArr =
		data.allSanityAside.edges.filter(aside => (
			aside.node._id === props.node._ref
		));

	const aside = asideArr[0].node;

	return (
		<div className="">
			{aside.showHeading === 'Yes' &&
				<h2>{aside.title}</h2>
			}
			{aside.imagePosition === 'Right' ?
				<div className="aside grid">
					<div>
						<BlockContent
							blocks={aside._rawBody}
							serializers={serializers} />
					</div>
					<aside className="flex flex-around">
						<Figure id={aside.mainImage.asset._id} alt={aside.imageAlt} />
					</aside>
				</div>
				:
				<div className="aside grid">
					<aside className="flex flex-around">
						<Figure id={aside.mainImage.asset._id} alt={aside.imageAlt} />
					</aside>
					<BlockContent
						blocks={aside._rawBody}
						serializers={serializers} />
				</div>
			}
		</div>
	)
}

export default Aside;
