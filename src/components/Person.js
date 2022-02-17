import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Figure from './Figure'
import serializers from './serializers'

const Person = (props) => {

	console.log('Person Props: ')
	console.log(props)
	let role;

// 	const data = useStaticQuery(graphql`
// `)

// 	console.log('Person data: ')
// 	console.log(data)

// 	data.allSanityRoleGroup.edges.forEach(role => {
// 		if (role.node._id === props.node._ref) {
// 			role = role.node;
// 		}
// 		console.log('role: ')
// 		console.log(role)
// 	})

	return (
		<article className="card products--card">
		</article>
	);
}

export default Person;

			// <Figure node={person}/>
			// <h3>{person.name}</h3>
			// <h4>{person.role}</h4>
			// <BlockContent blocks={person._rawBio} serializers={serializers}/>
