import React from "react"
import "./layout/layout.css"
import "./layout/normalize.css"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby';

export default function Layout({ children }) {
	return (
		<div>
			<header className="nav">
				<Link to="/kitchen-sink">
				<StaticImage
					src="../images/lcblogohd.png"
					alt="lol" />
				</Link>
				<nav>
					<Link to="/products">Store</Link>
					<Link to="/about-larche-cape-breton">About</Link>
				</nav>
			</header>
			<main className="layout">{children}</main>
			<footer>
				<h3 className="fake-logo">Fake Logo</h3>
				<nav>
					<Link to="/kitchen-sink">Home</Link>
					<Link to="/products">Store</Link>
				</nav>
			</footer>
		</div>

	)
}
