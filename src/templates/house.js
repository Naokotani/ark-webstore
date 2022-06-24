import React from 'react';
import Layout from "../components/Layout"

const House = ({pageContext}) => {
	console.log(pageContext)
  return (
		<Layout>
			<article className="post">
			<header className="flex underline">
			<h2>{pageContext.name}</h2>
				<h3>{pageContext.address}</h3>
			</header>
			</article>
		</Layout>
	);
}

export default House; 
