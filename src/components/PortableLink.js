import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby";

const PortableLink = ({ children, mark }) => {

    const data = useStaticQuery(graphql`
query {
  allSanityPage {
    edges {
      node {
        _id
        slug {
          current
        }
      }
    }
  }
  allSanitySubpage {
    edges {
      node {
        _id
        slug {
          current
        }
        parentPage {
          slug {
            current
          }
        }
      }
    }
  }
}
`)

    function getLink() {
        let link;
        const page = data.allSanityPage.edges.filter(page => { return (
            mark.reference._ref === page.node._id
        )})

        if (page) {
            link = `/${page[0].node.slug.current}`
        } else {
            const subpage = data.allSanitySubpage.edges.filter(subpage => { return (
                mark.reference._ref === subpage.node._id
            )})
            link = `/${subpage[0].node.parentPage.slug.current}/${subpage[0].node.slug.current}`
        }

        return link;
    }

    const link = getLink();

    return (
        <Link to={`/${link[0].node.slug.current}`}>
            {children.map(child => (
                <span>{child}</span>
            ))}
            {}
        </Link>
    )
}

export default PortableLink;
