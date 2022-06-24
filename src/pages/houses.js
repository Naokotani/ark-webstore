import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Figure from './../components/Figure'
import Layout from '../components/Layout'

const People = ({ data }) => {
	console.log(data)
	return (
		<Layout>
			<ul className="post--layout">
				{data.allSanityHouse.edges.map((house) => (
					<li key={house.node.id}>
						<Link to={`/house/${house.node.slug.current}`}>
							<div className="">
								<div className="">
									<section
										className="card post--card"
										key={house.node._id}>
										<Figure id={house.node.mainImage.asset.id} />
										<h3 className="h4">{house.node.title}</h3>
										<h4 className="h4">{house.node.address}</h4>
									</section>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export const query = graphql`
	query {
    allSanityHouse {
      edges {
        node {
          id
					address
          mainImage {
            asset {
              id
                }
            }
            title
            slug {
              current
            }
          }
        }
      }
    }
`


export default People;
