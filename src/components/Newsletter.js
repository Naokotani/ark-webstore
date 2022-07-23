import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import Figure from "./Figure"

const Newsletter = ({ pageContext, home = false }) => {

    const data = useStaticQuery(graphql`
query {
  allSanityNewsletter {
    edges {
      node {
        _rawBody
        title
        slug {
          current
        }
                                mainImage {
                                        asset {
                                                _id
                                        }
                                                }
                                date(formatString: "dddd MMMM Do, YYYY")
        pdf {
          asset {
                                                _id
            url
          }
        }
      }
    }
  }
}
`)

    const pdfs = home === true ?
          [data.allSanityNewsletter.edges[0]] :
          data.allSanityNewsletter.edges
    console.log(pdfs)

    return (
        <div>
            {pdfs.map((pdf) => (
                <aritcle className="post">
                    <header className="flex underline">
                        <h2>{pdf.node.title}</h2>
                        <time>
                            {pdf.node.date}
                        </time>
                    </header>
                    <div className="card grid pdf">
                        <Link to={`/pdfs/${pdf.node.pdf.asset._id}`}>
                            <Figure id={pdf.node.mainImage.asset._id} />
                        </Link>
                        <div>
                            <BlockContent
                                serializers={serializers}
                                blocks={pdf.node._rawBody} />
                        </div>
                    </div>
                </aritcle>
            ))}
        </div>
    );
}

export default Newsletter;
