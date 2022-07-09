import React, { useState } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby'


const MenuItem = ({ link, slug }) => {

	const data = useStaticQuery(graphql`
query {
  allSanitySubpage {
    edges {
      node {
				link
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

	const [showDropdown, setShowDropdown] = useState(false);

	const subPages = data.allSanitySubpage

	const dropdownItems = subPages.edges.filter(page => (
		slug === page.node.parentPage.slug.current
	))

	return (
		<li
			onMouseEnter={() => setShowDropdown(true)}
			onMouseLeave={() => setShowDropdown(false)}
			className="menu-items">
			<Link
				to={`/${slug}`}>
				{link}
			</Link>
			{dropdownItems[0] && showDropdown &&
				<ul
					className="dropdown show">
					{dropdownItems.map(item => (
						<li key={item.node.link}>
							<Link
								to={`/${slug}/${item.node.slug.current}`}>
								{item.node.link}
							</Link>
						</li>
					))}
				</ul>
			}
		</li>
	);
}

export default MenuItem; 
