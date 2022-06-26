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

	function findRoleComp() {
		const role = data.allSanityRoleComponent.edges.filter(
			(role) => role.node._id === props.node._ref
		);
		return role[0].number;
	}

	function randomPersonArry(role, p) {
		let people = [];
		while (people.length < role[0].node.number) {
			const item = p[Math.floor(Math.random() * p.length)];
			if (!people.includes(item)) {
				people.push(item);
			}
		}
		return people
	}

	function findSpecificPerosn(role, p) {
		let people = [];
		const names = role.specific.map(e => { return e.name })
		people = p.filter(person => names.some(name => name === person.node.name))
		return people;
	}

	function createPeopleArr(role) {
		let p = data.allSanityPerson.edges;
		let people;

		if (role.number && p.length >= role.number) {
			people = randomPersonArry(role, p)
		} else if (people.length < role.number) {
			console.error("Not enough Items in array.");
			//Otherwise finde the specific person to display
		} else {
			people = findSpecificPerosn(role, p)
		}
		return people;
	}

	const role = findRoleComp()
	const people = createPeopleArr(role)

	return (
		<div className="post">
			<header className="flex underline">
				<h2>{role[0].node.title}</h2>
				<Link to="/people">See All Community Members</Link>
			</header>
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
		</div>
	);
};

export default Role;
