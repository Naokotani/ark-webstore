import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { StaticImage } from "gatsby-plugin-image";
import { Link, useStaticQuery, graphql } from "gatsby";

const News = (props) => {

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

    return (
        <div className="post" >
            <header className="flex underline">
                <h2>Upcoming News and News</h2>
                <Link to="/posts">See All News and News</Link>
            </header>
            <ul>
                {posts.map((post) => (
                    <li>
                        <article className="post--card card grid">
                            <Link to={`/post/${post.node.slug.current}`}>
                                {post.node.mainImage ?
                                 <figure className="flex card-image">
                                     <Figure id={post.node.mainImage.asset._id} />
                                 </figure>
                                 :
                                 <figure className="flex card-image">
                                     <StaticImage src="../images/lcblogohd.png" alt="lol" />
                                 </figure>
                                }
                                <div>
                                    <h3>{post.node.title}</h3>
                                    <BlockContent
                                        blocks={post.node._rawBody}
                                        serializers={serializers} />
                                </div>
                            </Link>
                        </article>
                    </li>
                ))}
            </ul>
        </div >
    )

}

export default News;
