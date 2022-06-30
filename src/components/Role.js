import React, { useEffect, useState } from "react";
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

	function findComponent() {
		const role = data.allSanityRoleComponent.edges.filter(
			(role) => role.node._id === props.node._ref
		);

		return role[0].node;
	}

	function randomHouseArr(people, arr, role) {
		let i = 0

		while (people.length < role.number) {
			if (i === 20) {
				console.error("error generating people array")
				break;
			}
			const item = arr[Math.floor(Math.random() * arr.length)];
			if (!people.includes(item)) {
				people.push(item);
			}
			i++;
		}
		return people;
	}

	function createPersonArr(role) {
		let people = [];
		let arr = data.allSanityPerson.edges;

		if (role.number && arr.length >= role.number) {
			people = randomHouseArr(people, arr, role)
		} else if (people.length < role.number) {
			console.error("Not enough Items in array.");
			//Otherwise finde the specific person to display
		} else {
			const names = role.specific.map(e => { return e.name })
			people = arr.filter(person => names.some(name => name === person.node.name))
		}
		return people;
	}

	const [roleArr, setRoleArr] = useState([]);
	const [peopleArr, setPeopleArr] = useState([]);

	useEffect(() => {
		const role = findComponent();
		const people = createPersonArr(role);

		setRoleArr(role);
		setPeopleArr(people);
	}, [])

	return (
		<div className="post">
			<header className="flex underline">
				<h2>{roleArr.title}</h2>
				<Link to="/people">See All Community Members</Link>
			</header>
			<div className="products--layout">
				{peopleArr.map((person, i) => (
					<Link to={`/profile/${person.node.slug.current}`} key={i}>
						<article className="card products--card" key={person.node._id}>
							<Figure id={person.node.mainImage.asset._id} />
							<h3 className="h4">{person.node.name}</h3>
							<h4 className="h5">{person.node.role}</h4>
						</article>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Role;
