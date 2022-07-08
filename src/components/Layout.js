import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import { StoreContextProvider, useCartCount } from "../context/StoreContext"
import MenuItem from './MenuItem'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./layout/layout.css";
import "./layout/normalize.css";
import "./layout/carousel.css";
import "./layout/nav.css";
import './layout/products.css'
import "./layout/post.css"
import "./layout/page.css"

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
		
	allShopifyProduct {
  	edges {
  	  node {
  	    id
        variants {
          id
          shopifyId
        }
  	  }
  	}
  } 
}
  `);

	const cartCount = useCartCount();

	// // Remove the home page link with the slug "l-arche-cape-breton"
	const links = data.allSanityPage.edges.filter(
		(edge) => edge.node.slug.current !== "l-arche-cape-breton"
	)

	return (
		<StoreContextProvider>
			<header className="nav">
				<Link to="/">
					<StaticImage src="../images/lcblogohd.png" alt="lol" />
				</Link>
				<nav className="">
					<ul className="menu-items">
						{links.map((link, index) => (
							<MenuItem
								slug={link.node.slug.current}
								link={link.node.link}
								key={index} />
						))}
						<li>
							<Link to="/posts">News & Events</Link>
						</li>
						<li>
							<Link className="store" to="/products">Store</Link>
						</li>
						<li className="cart">
							<Link className="cart" to="/checkout">
								{cartCount === 0 &&
									<StaticImage
										src="../images/cart-shopping-solid.svg"
										alt="Shopping Cart"
										style={{
											width: "23.5px",
											height: "22.5px",
											display: "flex",
											position: "relative",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									/>
								}
								{cartCount > 0 &&
									<StaticImage
										src="../images/cart-plus-solid.svg"
										alt="shopping Cart"
										style={{
											width: "23.5px",
											height: "22.5px",
											display: "flex",
											position: "relative",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									/>
								}
							</Link>
						</li>
					</ul>
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
		</StoreContextProvider >
	);
}
