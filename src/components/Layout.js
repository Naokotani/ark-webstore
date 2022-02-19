import React from "react";
import "./layout/layout.css";
import "./layout/normalize.css";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";

export default function Layout({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allSanityPage {
        edges {
          node {
            link
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const links = data.allSanityPage.edges.filter(
    (edge) => edge.node.slug.current != "l-arche-cape-breton"
  );

  return (
    <div>
      <header className="nav">
        <Link to="/">
          <StaticImage src="../images/lcblogohd.png" alt="lol" />
        </Link>
        <nav>
          {links.map((link) => (
            <Link
              key={link.node.slug.current}
              to={`/${link.node.slug.current}`}
            >
              {link.node.link}
            </Link>
          ))}
          <Link to="/products">Store</Link>
        </nav>
      </header>
      <main className="layout">{children}</main>
      <footer>
        <h3 className="fake-logo">Fake Logo</h3>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Store</Link>
        </nav>
      </footer>
    </div>
  );
}
