import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Figure from './Figure'
import serializers from './serializers'

const Person = (props) => {

	let person;

	const data = useStaticQuery(graphql`
query {
  allSanityPerson {
    edges {
      node {
        _rawBio
        _id
        mainImage {
          asset {
            _id
          }
        }
        slug {
          current
        }
        name
        role
      }
    }
  }
}
`)

	if (!props.person) {

		data.allSanityPerson.edges.forEach(e => {
			if (e.node._id === props.node._ref) {
				person = e.node;
			}
		})

	} else {
		person = props.person
	}

	console.log(person)
	return (
		<article className="card">
			<Figure node={person}/>
			<h3>{person.name}</h3>
			<h4>{person.role}</h4>
		</article>
	);
}

export default Person;
