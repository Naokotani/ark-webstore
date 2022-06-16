import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import serializers from '../components/serializers';
import Figure from '../components/Figure'

const Posts = ({ pageContext }) => {


	const post = pageContext;
	console.log(post)
	console.log(post.body)
	return (
		<Layout>
			<h1>
				{post.title}
			</h1>
			<h3>{post.slug}</h3>
			<h3>{post.published}</h3>
			{post.image &&
				<Figure id={post.image.asset._id} />
			}
			<BlockContent blocks={post.body} serializers={serializers} />
		</Layout>
	)
}

export default Posts;
