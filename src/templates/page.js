import * as React from "react";
import BlockContent from "@sanity/block-content-to-react";
import serializers from "../components/serializers";
import Layout from "../components/Layout";

const Page = ({ pageContext }) => {
	const page = pageContext;

	console.log(pageContext)

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
