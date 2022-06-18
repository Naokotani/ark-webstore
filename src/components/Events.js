import React, { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { Link, useStaticQuery, graphql } from "gatsby";
import "./post.css"

const Events = ({ sort, number }) => {

	const data = useStaticQuery(graphql`
query {
  allSanityPost(limit: 10) {
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

	const [posts, setPosts] = useState([])
	const [postNum, setPostNum] = useState(number)

	// If here are enough event posts then slice the array of posts up
	// to that number, or if it is less, then diplay all posts. 

	const handleNext = () => {
		setPosts([
			...posts.slice(postNum - 1),
			...posts.slice(0, postNum - 1)
		])
	}

	const handlePrev = () => {
		setPosts([
			...posts.slice(1),
			...posts.slice(0, 1)
		])
	}

	useEffect(() => {
		if (data.allSanityPost.edges.length > postNum) {
			setPosts(data.allSanityPost.edges.slice(0, postNum));
		} else {
			setPosts(data.allSanityPost.edges);
		}
	}, [postNum])

	// Create an h3 for each event post title.
	return (
		<div className="post">
			<div className="flex underline">
				<h2>Upcoming News and Events</h2>
				<Link to="/posts">See All News and Events</Link>
			</div>
			<ul className="">
				<button
					className=""
					onClick={() => handleNext()}>&#8592;</button>
				<button
					onClick={() => handlePrev()}>&#8594;</button>
				{posts[0] &&
					<Link to={`/posts/${posts[0].node.slug.current}`}>
						<div className="post--card card grid">
							{posts[0].node.mainImage &&
								<aside className="flex">
									<Figure id={posts[0].node.mainImage.asset._id} />
								</aside>
							}
							<article className="">
								<h3>{posts[0].node.title}</h3>
								<p>{posts[0].node.date}</p>
								<BlockContent
									blocks={posts[0].node._rawBody}
									serializers={serializers} />
							</article>
						</div>
					</Link>
				}
				{posts.slice(1).map((post) => (
					<Link to={`/posts/${post.node.slug.current}`}>
						<div className="post--card card">
							<article className="">
								<h5>{post.node.title}</h5>
							</article>
						</div>
					</Link>
				))}
			</ul>
		</div >
	)

}

export default Events;
