import * as React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import News from './News';
import Events from './Events';
import Newsletter from './Newsletter'
import Posts from './Posts'

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

  const postType = post[0].node.postType

  return (
    <div>
      {
        post[0].node.postType === 'News' &&
        <News
          sort={post[0].node.sort}
          number={post[0].node.number}
        />
      }
      {
        post[0].node.postType === 'Events' &&
        <Events
          sort={post[0].node.sort}
          number={post[0].node.number}
        />
      }
      {
        post[0].node.postType === 'Newsletter' &&
        <Newsletter
          sort={post[0].node.sort}
          number={post[0].node.number}
        />
      }
      {
        post[0].node.postType === 'News & Events' &&
        <Posts
          sort={post[0].node.sort}
          number={post[0].node.number}
        />
      }
    </div>
  )
}

export default Post;
