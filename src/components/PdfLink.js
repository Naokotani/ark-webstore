import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const PdfLink = (props) => {
	console.log(props)
	const data = useStaticQuery(graphql`
query {
  allSanityPdf {
    edges {
      node {
        _id
        file {
          asset {
            url
            id
          }
        }
      }
    }
  }
}
`)
	console.log(props)

	let url;
	data.allSanityPdf.edges.forEach(e => {
		if (props.mark.item && e.node._id === props.mark.item._ref) {
			url = e.node.file.asset.url;
		}
	})

	return (
		<span>
			<a href={url}>{props.children[0]}</a>
		</span>
	);
}

export default PdfLink;
