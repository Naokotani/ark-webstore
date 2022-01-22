require("dotenv").config()

module.exports = {
	siteMetadata: {
		title: `ark-webstore`,
		siteUrl: `https://www.yourdomain.tld`,
	},
	plugins: [
		{
			resolve: `gatsby-source-shopify`,
			options: {
				password: process.env.SHOPIFY_SHOP_PASSWORD,
				storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
			},
		},
		"gatsby-plugin-image",

	]
}
