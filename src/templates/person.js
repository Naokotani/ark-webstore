import * as React from 'react';
import Layout from '../components/Layout' 
import Figure from '../components/Figure'

const Person = ({pageContext}) => {
	console.log(pageContext.image)
	return (
		<Layout>
			<h1>{pageContext.name} | {pageContext.role}</h1>
			<Figure id={pageContext.image.asset._id} />
		</Layout>
	)
}

export default Person;
