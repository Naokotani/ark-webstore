import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const House = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allSanityHouse {
        edges {
          node {
            _rawBody
            title
            slug {
              current
            }
            mainImage {
              asset {
                _id
                gatsbyImageData
              }
            }
            address
            _id
          }
        }
      }
    }
  `);

  let house;
  data.allSanityHouse.edges.forEach((e) => {
    if (e.node._id === props.node._ref) {
      house = e.node;
    }
  });
  return (
    <article className="flex">
      <section>
        <h3>{house.title}</h3>
        <h4>{house.address}</h4>
        <BlockContent blocks={house._rawBody} serializers={serializers} />
      </section>
      <aside>
        <Figure node={house} />
      </aside>
    </article>
  );
};

export default House;
