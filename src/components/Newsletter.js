import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import { Link, graphql, useStaticQuery } from 'gatsby';
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";

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
				date(formatString: "dddd MMMM Do, YYYY")
        pdf {
          asset {
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
					<div className="grid pdf">
						<Link to={`/am-furan/${pdf.node.slug.current}`}>
							<Document
								onLoadError={console.error}
								file={`${pdf.node.pdf.asset.url}`}>
								<Page
									width={300}
									pageNumber={1} />
							</Document>
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
