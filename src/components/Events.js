import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { useStaticQuery, graphql } from "gatsby";
import "./post.css"

const Events = ({ sort, number }) => {

	const data = useStaticQuery(graphql`
query {
  allSanityPost(filter: {type: {eq: "Event"}}, limit: 10) {
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
				date
        author {
          name
        }
      }
    }
  }
}
`)

	// If here are enough event posts then slice the array of posts up
	// to that number, or if it is less, then diplay all posts. 
	let posts;
	if (data.allSanityPost.edges.length > number) {
		posts = data.allSanityPost.edges.slice(0, number);
	} else {
		posts = data.allSanityPost.edges
	}

	console.log(posts)

	// Create an h3 for each event post title.
	return (
		<div className="">
			<ul className="post--layout">
			{posts.map((post) => (
				<div className="post--card card grid">
					<article className="aside-left">
						<h3>{post.node.title}</h3>
						<p>{post.node.date}</p>
						<BlockContent
							blocks={post.node._rawBody}
							serializers={serializers} />
					</article>
					<aside className="aside-right">
						<Figure id={post.node.mainImage.asset._id} />
					</aside>
				</div>
			))}
			</ul>
		</div>
	)

}

export default Events;
