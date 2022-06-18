import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout'
import Figure from './../components/Figure'

const Post = ({ data }) => {
	console.log(data)
	return (
		<Layout>
			<ul className="post--layout">
				{data.allSanityPost.edges.map((post) => (
					<li>
						{console.log(post)}
						<Link to={`/post/${post.node.slug.current}`}>
							<section
								className="card post--card">
								{post.node.mainImage &&
									<Figure id={post.node.mainImage.asset._id} />
								}
								<h3 className="h4">{post.node.title}</h3>
							</section>
						</Link>
					</li>
				))}
			</ul>
		</Layout>
	);
};

export const query = graphql`
query {
  allSanityPost {
    edges {
      node {
				id
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
`


export default Post;
