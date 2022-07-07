import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const Human = ({ body, imageId, title, slug }) => {

	return (
		<div className="human">
			<Link to={`/humans/$[{slug}]`}>
				<article className="card grid aside-right">
					<div>
						<h2>{title}</h2>
						<div className="fade post-text fade__human">
							<BlockContent
								blocks={body}
								serializers={serializers} />
						</div>
						<p>Read More</p>
					</div>
					<figure>
						<Figure id={imageId} />
					</figure>
				</article>
			</Link>
		</div>
	);
}

export default Human;
