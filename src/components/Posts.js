import React from 'react'
import BlockContent from '@sanity/block-content-to-react';
import { graphql, Link, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Figure from "./Figure"
import serializers from './serializers';

const Posts = ({ sort, number }) => {

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
                                location
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


    console.log(sort)
    console.log(number)
    const posts = data.allSanityPost.edges


    return (
        <div className="post event" >
            {posts.map((post, i) => (
                <article key={i}>
                    <Link to={`/post/${post.node.slug.current}`}>
                        <div className="post--card card grid">
                            <figure
                                className="flex card-image">
                                {post.node.mainImage ?
                                 <Figure
                                     id={post.node.mainImage.asset._id} />
                                 :
                                 <StaticImage
                                     src="../images/lcblogohd.png"
                                     alt="L'Arche Logo" />
                                }
                            </figure>
                            <div>
                                <h3 className="underline">{post.node.title}</h3>
                                <time>{post.node.date}</time>
                                <p className="text_small"> {post.node.location}</p>
                                <div className="fade fade-text fade__post">
                                    <BlockContent
                                        blocks={post.node._rawBody}
                                        serializers={serializers} />
                                </div>
                            </div>
                        </div>
                    </Link>
                </article>
            ))}
        </div >
    )
}

export default Posts;
