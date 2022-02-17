import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Figure from "./Figure";

const Role = ({}) => {
  const data = useStaticQuery(graphql`
    query {
      allSanityPerson {
        nodes {
          role
          name
          mainImage {
            asset {
              gatsbyImageData
            }
          }
        }
      }
    }
  `);

  console.log(data);

  return (
    <div>
      <p>person</p>
    </div>
  );
};
