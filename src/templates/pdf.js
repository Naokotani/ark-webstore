import * as React from "react";
import Layout from "../components/Layout";

const Pdf = ({ pageContext }) => {

	return (
		<Layout>
			<article className="page">
			<iframe
				className="pdf-iframe"
				src={`${pageContext.link}#view=fitH`}
				title={pageContext.title}
				height="100%"
				width="100%" />
			</article>
		</Layout>
	);
};

export default Pdf;
