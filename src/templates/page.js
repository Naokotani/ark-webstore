import * as React from "react";
import BlockContent from "@sanity/block-content-to-react";
import Layout from "../components/Layout";
import serializers from "../components/serializers";

const Page = ({ pageContext }) => {
	const page = pageContext;

	return (
		<Layout>
			<article className="page">
				<h1>{page.title}</h1>
				<BlockContent blocks={page.body} serializers={serializers} />
			</article>
		</Layout>
	);
};

export default Page;
