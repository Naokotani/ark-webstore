import React, { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { StaticImage } from "gatsby-plugin-image";
import { Link, useStaticQuery, graphql } from "gatsby";

const News = (props) => {

	console.log(props)
	const data = useStaticQuery(graphql`
query {
	allSanityPost(sort: {order: DESC, fields: _createdAt}, limit: 10) {
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
				date(formatString: "dddd MMMM Do, YYYY hh:mma")
        author {
          name
        }
      }
    }
  }
}
`)
	

	const posts = data.allSanityPost.edges.slice(0, 4);
	const [postSlug, setPostSlug] = useState(data.allSanityPost.edges[0].node.slug.current)

	const handleMouseOver = (post) => {
		console.log(post.node.title)
		setPostSlug(post.node.slug.current)
	}

	return (
		<li className="post" >
			<header className="flex underline">
				<h2>Upcoming News and News</h2>
				<Link to="/posts">See All News and News</Link>
			</header>
			<ul className="">
				{posts.map((post) => (
					<Link to={`/post/${post.node.slug.current}`}>
						<li className="post--card card grid"
							onMouseOver={() => handleMouseOver(post)}>

							{postSlug === post.node.slug.current &&
								<aside className="flex card-image">
									{post.node.mainImage ?
									<Figure id={post.node.mainImage.asset._id} />
									 :
									<StaticImage src="../images/lcblogohd.png" alt="lol" />
									}
								</aside>
							}
							<article className="">
								<h3>{post.node.title}</h3>
								{postSlug === post.node.slug.current &&
									<li>
										<BlockContent
											blocks={post.node._rawBody}
											serializers={serializers} />
									</li>
								}
							</article>
						</li>
					</Link>
				))}
			</ul>
		</li >
	)

}

export default News;
