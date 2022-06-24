import React from 'react';
import Layout from "../components/Layout"
import Figure from '../components/Figure'
import serializers from "../components/serializers";
import BlockContent from "@sanity/block-content-to-react";

const House = ({ pageContext }) => {
	console.log(pageContext.body)
	return (
		<Layout>
			<article className="post">
				<header className="flex underline">
					<h2>{pageContext.name}</h2>
					<h3>{pageContext.address}</h3>
				</header>
				<Figure id={pageContext.image.asset._id} alt="" />
				<BlockContent
					blocks={pageContext.body}
					serializers={serializers} />
			</article>
		</Layout>
	);
}

export default House; 
