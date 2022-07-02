import * as React from 'react';
import Layout from '../components/Layout'
import Figure from '../components/Figure'
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import { StaticImage } from "gatsby-plugin-image";

const Person = ({ pageContext }) => {

	const person = pageContext;

	return (
		<Layout>
			<article className="page">
				<div className="post">
					<header className="flex underline">
						<h1>{person.name}</h1>
						<h2>{person.role}</h2>
					</header>
				</div>
				<figure
					className="page-image">
					{person.image ?
						<Figure
							id={person.image} />
						:
						<StaticImage
							src="../images/lcblogohd.png"
							alt="L'Arche Logo" />
					}
				</figure>
				<div className="page-body">
					<BlockContent blocks={person.body} serializers={serializers} />
				</div>
			</article>
		</Layout>
	)
}

export default Person;
