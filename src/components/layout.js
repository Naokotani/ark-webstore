import React from "react"
import "./layout/layout.css"
import "./layout/normalize.css"

export default function Layout({ children }) {
	return (
		<div>
			<header>
				<h1 class="fake-logo">Fake Logo</h1>
				<img src="../images/layout_set_logo.png" alt="lol"/>
				<nav>
					<a href="#">Home</a>
					<a href="#">About</a>
					<a href="#">Contact</a>
				</nav>
			</header>
			<div className="layout">{children}</div>
			<footer>
				<h3 className="fake-logo">Fake Logo</h3>
				<nav>
					<a >Home</a>
					<a >About</a>
					<a >Contact</a>
				</nav>
			</footer>
		</div>

	)
}
