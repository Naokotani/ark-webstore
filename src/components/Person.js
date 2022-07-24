import * as React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import BlockContent from '@sanity/block-content-to-react';
import Figure from './Figure'
import serializers from './serializers'

const Person = (props) => {

  data = useStaticQuery(graphql`
    query{
      allSanityPerson {
        edges {
          node {
            name
            slug {
              current
            }
            mainImage {
              asset {
                _id
                gatsbyImageData
              }
            }
            _id
            role
            _rawBio
          }
        }
      }
    }
    `);

  let person;
  data.allSanityPerson.edges.forEach((e) => {
    if (e.node._id === props.node._ref) {
      person = e.node;
    }
  });

  return (
    <article className="flex">
      <section>
        <h3>{person.name}</h3>
        <h4>{person.role}</h4>
        <BlockContent blocks={person._rawBio} serializers={serializers} />
      </section>
      <aside>
        <Figure id={person.mainImage.asset._id} />
      </aside>
    </article>
  );
};

export default Person;
