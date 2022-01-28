import React from "react"
import "./layout/layout.css"
import "./layout/normalize.css"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';

export default function Layout({ children }) {
	return (
		<article>
			<header>
				<Link to="/kitchen-sink">
				<StaticImage
					src="../images/lcblogohd.png"
					alt="lol" />
				</Link>
				<nav>
					<Link to="/products">Store</Link>
					<Link to="/about-larche-cb">About</Link>
				</nav>
			</header>
			<article className="layout">{children}</article>
			<footer>
				<h3 className="fake-logo">Fake Logo</h3>
				<nav>
					<Link to="/kitchen-sink">Home</Link>
					<Link to="/products">Store</Link>
				</nav>
			</footer>
		</article>

	)
}
