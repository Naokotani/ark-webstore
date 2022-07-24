import React, { useEffect, useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import BlockContent from "@sanity/block-content-to-react";
import Figure from "./Figure";
import serializers from "./serializers";

const House = (props) => {

  const data = useStaticQuery(graphql`
    query {
      allSanityHouseComponent {
        edges {
          node {
            number
            specific {
              title
            }
            type
            _id
          }
        }
      }
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


  function findComponentType(arr) {
    if (props.node) {
      const comp = arr.filter(
        (comp) => comp.node._id === props.node._ref
      );
      return comp[0].node;
    } else {
      return {
        type: "All",
        number: data.allSanityHouse.edges.length
      }
    }
  }

  function randomHouseArray(number, houseArr, houses) {
    let i = 0

    while (houses.length < number) {
      if (i === 20) {
        console.error("error generating houses array")
        break;
      }
      const item = houseArr[Math.floor(Math.random() * houseArr.length)];
      if (!houses.includes(item)) {
        houses.push(item);
      }
      i++;
    }
    return houses;
  }


  function findSpecificHouse(comp, houseArr) {
    const titles = comp.specific.map(e => { return e.title })
    return houseArr.filter(house => titles.some(title => title === house.node.title))
  }

  function createHouseArray(comp) {

    let houses = [];
    let h = data.allSanityHouse.edges;

    if (
      comp.type === "All" ||
      comp.type === "Random" &&
      h.length >= comp.number
    ) {
      houses = randomHouseArray(comp.number, h, houses);
    } else if (h.length < comp.number) {
      console.error("Not enough Items in array.");
    } else if (comp.type === "Specific") {
      houses = findSpecificHouse(comp, h)
    }
    return houses;
  }

  function defComp(type) {
    if (type === false) {
      const comp = {
        number: data.allSanityHouse.edges.length
      }
      return type
    } else {
      return type
    }
  }

  const [housesArr, setHousesArr] = useState([])

  useEffect(() => {
    const comp =
      findComponentType(data.allSanityHouseComponent.edges)
    const houses = createHouseArray(comp);
    setHousesArr(houses)
  }, [data])

  return (
    <section>
      {housesArr.map((house, i) => {
        const left = (i + 1) % 2
        if (left) {
          return (
            <article
              className="house post grid aside-right"
              key={house.node._id}>
              <section>
                <header className="flex underline">
                  <h2>{house.node.title}</h2>
                  {!props.page &&
                    <Link to="houses">See All Houses</Link>
                  }
                </header>
                <h5>{house.node.address}</h5>
                <BlockContent
                  blocks={house.node._rawBody}
                  serializers={serializers} />
              </section>
              <aside className="flex flex-around house-image">
                <Figure id={house.node.mainImage.asset._id} alt="" />
              </aside>
            </article>
          )
        } else {
          return (
            <article
              className="house post grid aside-left"
              key={house.node._id}>
              <aside className="flex flex-around house-image">
                <Figure id={house.node.mainImage.asset._id} alt="" />
              </aside>
              <section>
                <header className="flex underline">
                  <h2>{house.node.title}</h2>
                  {!props.page &&
                    <Link to="houses">See All Houses</Link>
                  }
                </header>
                <h5>{house.node.address}</h5>
                <BlockContent
                  blocks={house.node._rawBody}
                  serializers={serializers} />
              </section>
            </article>
          )
        }
      })}
    </section>
  );
};

export default House;
