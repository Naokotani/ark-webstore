import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby";
import Client from 'shopify-buy';
import "./layout/layout.css";
import "./layout/normalize.css";

export default function Layout({ children, checkout }) {

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

	// async function checkout() {
	// 	// build a client
	// 	console.log('foo');
	// 	const client = Client.buildClient({
	// 		storefrontAccessToken: '8b8ef58e1ae3085248ff54cb7cdf8e07',
	// 		domain: `ark-webstore.myshopify.com`,
	// 	})

	// 	// create a checkout
	// 	const checkout = await client.checkout.create()

	// 	// create an array of line items
	// 	console.log(data.allShopifyProduct.edges[0].node.variants[0].shopifyId)
	// 	const variantId = data.allShopifyProduct.edges[0].node.variants[0].shopifyId;
	// 	console.log(variantId)


	// 	const lineItemsToAdd = [{ variantId, quantity: 1 }];

	// 	// add line items to the checkout
	// 	const checkoutId = checkout.id
	// 	const newCheckout = await client.checkout.addLineItems(
	// 		checkoutId,
	// 		lineItemsToAdd
	// 	)

	// 	// finish the checkout by visiting webUrl
	// 	window.open(checkout.webUrl)
	// }

	// // Remove the home page link with the slug "l-arche-cape-breton"
	const links = data.allSanityPage.edges.filter(
		(edge) => edge.node.slug.current !== "l-arche-cape-breton"
	);
	// // return the header with the nav, logo/link, link menu, and the footer. Children are
	// // in the main tag.

	return (
		<div>
			<header className="nav">
				<Link to="/">
					<StaticImage src="../images/lcblogohd.png" alt="lol" />
				</Link>
				<nav>
					<button
						className=""
						onClick={() => checkout()}>BUY</button>
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
