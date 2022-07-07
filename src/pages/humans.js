import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import Human from '../components/Human'

const Houses = ({ data }) => {

	const humans = data.allSanityHuman.edges

	return (
		<Layout>
			<h1>Human's of L'Arche Cape Breton</h1>
			{humans.map(human => (
				<Human
					body={human.node._rawBody}
					imageId={human.node.mainImage.asset._id}
					title={human.node.title}
					slug={human.node.slug.current}
					key={human.node._id}
				/>
			))}
		</Layout>
	);
};

export const query = graphql`
query {
  allSanityHuman {
    edges {
      node {
        _rawBody
        _id
        mainImage {
          asset {
            _id
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


export default Houses;
