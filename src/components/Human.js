import React from 'react'
import { Link } from 'gatsby'
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const Human = ({ body, imageId, title, slug }) => {

	return (
		<div className="">
			<Link to={`/humans/${slug}`}>
				<article className="card grid aside-right human">
					<div>
						<h2>{title}</h2>
						<div className="fade post-text fade__human">
							<BlockContent
								blocks={body}
								serializers={serializers} />
						</div>
						<p className="human-more">Read More</p>
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
