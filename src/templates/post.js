import * as React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import serializers from '../components/serializers';
import Figure from '../components/Figure'
import { StaticImage } from "gatsby-plugin-image";

const Posts = ({ pageContext }) => {
  const post = pageContext;

  const locationURL =
    post.location &&
    "https://google.com/maps/place/" +
    post.location.replace(/ /g, "+");

  return (
    <Layout>
      <article className="page">
        <div className="post">
          <header class="flex underline">
            <h1>
              {post.title}
            </h1>
            <p className="header-date">{post.date}</p>
          </header>
        </div>
        {locationURL &&
          <div>
            <h4 className="location">{post.location}</h4>
            <a
              href={locationURL}
              target="_blank"
              rel="noopener noreferrer">
              Open in Google Maps</a>
          </div>
        }
        <figure
          className="page-image">
          {post.image ?
            <Figure
              id={post.image} />
            :
            <StaticImage
              src="../images/lcblogohd.png"
              alt="L'Arche Logo" />
          }
        </figure>
        <div className="page-body">
          <BlockContent blocks={post.body} serializers={serializers} />
        </div>
      </article>
    </Layout>
  )
}

export default Posts;
