import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Figure from './../components/Figure'
import Layout from '../components/Layout'

const People = ({ data }) => {
	return (
		<Layout>
			<ul className="post--layout">
				{data.allSanityPerson.edges.map((person) => (
					<li key={person.node.id}>
						<Link to={`/profile/${person.node.slug.current}`}>
							<div className="">
								<div className="">
									<section
										className="card post--card"
										key={person.node._id}>
										<Figure id={person.node.mainImage.asset.id} />
										<h3 className="h4">{person.node.name}</h3>
										<h4 className="h5">{person.node.role}</h4>
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
    allSanityPerson {
      edges {
        node {
          id
          mainImage {
            asset {
              id
                }
            }
            name
            role
            slug {
              current
            }
          }
        }
      }
    }
`


export default People;
