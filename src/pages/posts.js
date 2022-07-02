import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout'
import Event from '../components/Events'

const Post = () => {
	return (
		<Layout>
			<Event all={true} page={true} />
		</Layout>
	);
};

export default Post;
