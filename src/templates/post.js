import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/layout';
import serializers from '../components/serializers';

const Posts = ({ pageContext }) => {


	const post = pageContext;
	console.log(post.body)
	return (
		<Layout>
			<h1>
				{post.title}
			</h1>
			<h5>by {post.author}</h5>
			<p>{post.slug}</p>
			<BlockContent blocks={post.body} serializers={serializers} />
		</Layout>
	)
}

export default Posts;
