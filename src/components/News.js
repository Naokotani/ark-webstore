import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { useStaticQuery, graphql } from "gatsby";

const News = ({ sort, number }) => {
	const data = useStaticQuery(graphql`
query {
  allSanityPost(filter: {type: {eq: "News"}}, limit: 10) {
    edges {
      node {
        title
        slug {
          current
        }
        publishedAt
        mainImage {
          asset {
            _id
          }
        }
        _rawBody
        author {
          name
        }
      }
    }
  }
}
`)

	let posts;

	if (data.allSanityPost.edges.length > number) {
		posts = data.allSanityPost.edges.slice(0, number);
	} else {
		posts = data.allSanityPost.edges
	}

	return (
		<div>
			<h2>News</h2>
			{posts.map((post) => (
				<div>
					<p>{post.node.title}</p>
				</div>
			))}
		</div>
	)
}

export default News;
