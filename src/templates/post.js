import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import serializers from '../components/serializers';
import Figure from '../components/Figure'

const Posts = ({ pageContext }) => {

	const post = pageContext;

	const locationURL =
		"https://google.com/maps/place/" +
		post.location.replace(/ /g, "+");

	return (
		<Layout>
			<div className="post">
				<header class="flex underline">
					<h1>
						{post.title}
					</h1>
					<p className="header-date">{post.date}</p>
				</header>
			</div>
			<h4 className="location">{post.location}</h4>
			<a
				href={locationURL}
				target="_blank"
				rel="noopener noreferrer">
				Open in Google Maps</a>
			{post.image &&
				<Figure id={post.image.asset._id} />
			}
			<BlockContent blocks={post.body} serializers={serializers} />
		</Layout>
	)
}

export default Posts;
