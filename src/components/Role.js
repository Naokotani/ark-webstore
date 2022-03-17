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

	//Find the matching role from the role reference
  const role = data.allSanityRoleComponent.edges.filter(
    (role) => role.node._id === props.node._ref
  );

	//Copy the list of person objects
  let p = data.allSanityPerson.edges;

	//Create an empty list for people
  let people = [];

	/* If the number is true and the lenth of the list of people is equal to 
or greater than nubmer then while the people list is shorter than number
add a random person that has not been added to the people list. */
  if (role[0].node.number && p.length >= role[0].node.number) {
    while (people.length < role[0].node.number) {
      const item = p[Math.floor(Math.random() * p.length)];
      if (!people.includes(item)) {
        people.push(item);
      }
    }
  } else if (people.length < role[0].node.number) {
    console.error("Not enough Items in array.");
		//Otherwise finde the specific person to display
  } else {
		const names = role[0].node.specific.map(e => {return e.name})
		people = p.filter(person => names.some(name => name === person.node.name))
	}

  return (
    <div className="products--layout">
      {people.map((person) => (
        <Link to={`/profile/${person.node.slug.current}`}>
          <section className="card products--card" key={person.node._id}>
            <Figure id={person.node.mainImage.asset._id} />
            <h3 className="h4">{person.node.name}</h3>
            <h4 className="h5">{person.node.role}</h4>
          </section>
        </Link>
      ))}
    </div>
  );
};

export default Role;
