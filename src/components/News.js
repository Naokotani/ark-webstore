import React, { useState } from 'react';
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
						{post.node.mainImage &&
						 <Figure id={post.node.mainImage.asset._id} />
						}
					</aside>
				</div>
			))}
			</ul>
		</div>
	)
}

export default News;
