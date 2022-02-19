import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Figure from "./Figure";

const Role = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allSanityRoleComponent {
        edges {
          node {
            type
            title
            number
            specific {
							name
            }
            group {
              title
            }
            _id
          }
        }
      }
      allSanityPerson {
        edges {
          node {
            _id
            mainImage {
              asset {
                _id
              }
            }
            name
            role
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const role = data.allSanityRoleComponent.edges.filter(
    (role) => role.node._id === props.node._ref
  );
  let p = data.allSanityPerson.edges;

  let people = [];
  if (role[0].node.number && p.length >= role[0].node.number) {
    while (people.length < role[0].node.number) {
      const item = p[Math.floor(Math.random() * p.length)];
      if (!people.includes(item)) {
        people.push(item);
      }
    }
  } else if (people.length < role[0].node.number) {
    console.error("Not enough Items in array.");
  } else {
		const names = role[0].node.specific.map(e => {return e.name})
		people = p.filter(person => names.some(name => name === person.node.name))
	}

  return (
    <div className="products--layout">
      {people.map((person) => (
        <Link to={`/team/${person.node.slug}`}>
          <section className="card products--card" key={person.node._id}>
            <Figure node={person.node} />
            <h3 className="h4">{person.node.name}</h3>
            <h4 className="h5">{person.node.role}</h4>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default Role;
