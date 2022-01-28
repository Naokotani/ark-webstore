import * as React from 'react';
import { graphql } from 'gatsby';

const TestGatsby = ({data}) => {
	console.log(data)
	return (
		<ul>
			{data.allSanityPost.edges.map((node) => (
				<li>
				{console.log(node)}
					<h5>{node.node.title}</h5>
				</li>	
			))}
		</ul>
	);
};

export const query = graphql`
query {
  allSanityPost {
    edges {
      node {
        title
      }
    }
  }
}
`


export default TestGatsby;
