import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout'

const Post = ({ data }) => {
	console.log(data)
	return (
		<Layout>
			<ul>
				{data.allSanityPost.edges.map((node) => (
					<li>
						{console.log(node)}
						<h5>{node.node.title}</h5>
					</li>
				))}
			</ul>
		</Layout>
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


export default Post;
