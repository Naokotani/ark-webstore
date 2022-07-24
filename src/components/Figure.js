import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { getGatsbyImageData } from "gatsby-source-sanity";

const Figure = ({ node, id, classProp = "", style = "" }) => {

  const data = useStaticQuery(graphql`
    query {
      allSanityLinkedImage {
        edges {
          node {
            _id
            isLink
            imageURL
            isFloat
            mainImage {
              asset {
                _id
              }
            }
            imageAlt
            center
          }
        }
      }
    }
    `)

  function getImageObj() {
    let imageObj = node &&
      data.allSanityLinkedImage.edges.filter(linkedImage => (
        linkedImage.node._id === node._ref
      ));

    imageObj = imageObj[0].node

    return imageObj
  }

  function getImage(id) {
    const sanityConfig = { projectId: "3u2gq4se", dataset: "tbt" };

    return getGatsbyImageData(id, { maxWidth: 1024 }, sanityConfig);
  }

  function getImageClass(imageObj) {
    let imageClass = "";

    if (imageObj.center === "Yes") {
      imageClass = "center-image"
    }

    if (imageObj.isFloat === "Yes") {
      imageClass = "page-image"
    }

    return imageClass;
  }

  const imageObj = node ? getImageObj() : { isLink: "No" }

  const image = node ?
    getImage(imageObj.mainImage.asset._id) :
    getImage(id);

  const imageClass = node ? getImageClass(imageObj) : classProp

  return (
    <div>
      {imageObj.isLink === "No" ?
        <figure className={imageClass}>
          <GatsbyImage image={image} alt="" />
        </figure>
        :
        <figure className={imageClass}>
          <a href={imageObj.imageURL}>
            <GatsbyImage image={image} alt="" style={style} />
          </a>
        </figure>
      }
    </div>
  );
};

export default Figure;
