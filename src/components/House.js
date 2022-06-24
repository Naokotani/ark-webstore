import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const House = (props) => {
	const data = useStaticQuery(graphql`
    query {
			allSanityHouseComponent {
				edges {
					node {
						number
						specific {
							title
						}
						type
						_id
					}
				}
			}
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
	const comp = data.allSanityHouseComponent.edges.filter(
		(comp) => comp.node._id === props.node._ref
	);

	//Copy the list of person objects
	let h = data.allSanityHouse.edges;

	//Create an empty list for people
	let houses = [];

	/* If the number is true and the lenth of the list of people is equal to 
or greater than nubmer then while the people list is shorter than number
add a random person that has not been added to the people list. */
	if (comp[0].node.number && h.length >= comp[0].node.number) {
		while (houses.length < comp[0].node.number) {
			const item = h[Math.floor(Math.random() * h.length)];
			if (!houses.includes(item)) {
				houses.push(item);
			}
		}
	} else if (h.length < comp[0].node.number) {
		console.error("Not enough Items in array.");
		//Otherwise finde the specific person to display
	} else {
		const titles = comp[0].node.specific.map(e => { return e.title })
		houses = h.filter(house => titles.some(title => title === house.node.title))
	}

	return (
		<div>
			{houses.map(house => (
				<article className="house post grid aside-right">
					<section>
						<header className="flex underline">
							<h2>{house.node.title}</h2>
							<Link to="houses">See All Houses</Link>
						</header>
						<h5>{house.node.address}</h5>
						<BlockContent
							blocks={house.node._rawBody}
							serializers={serializers} />
					</section>
					<aside className="flex flex-around house-image">
						<Figure id={house.node.mainImage.asset._id} alt="" />
					</aside>
				</article>
			))}
		</div>
	);
};

export default House;

