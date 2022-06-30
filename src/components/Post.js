import * as React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import News from './News';
import Events from './Events';

const Post = (props) => {

	const data = useStaticQuery(graphql`
query {
  allSanityPostComponent {
    edges {
      node {
        _id
        sort
        postType
        number
      }
    }
  }
}
`)

	const post = data.allSanityPostComponent.edges.filter(
		(post) => post.node._id === props.node._ref
	);

	return (
		<section>
			{
				post[0].node.postType === 'News' ?
					<News
						sort={post[0].node.sort}
						number={post[0].node.number}
					/> :
					<Events
						sort={post[0].node.sort}
						number={post[0].node.number}
					/>
			}
		</section>
	)
}

export default Post;
