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
        {
            resolve: "gatsby-source-sanity",
            options: {
                projectId: process.env.SANITY_ID,
                dataset: "tbt",
                token: process.env.SANITY_TOKEN,
                watchMode: true,
                overlayDrafts: true,
            },
        },
        `gatsby-plugin-image`,
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        `@sanity/block-content-to-react`,
        `react-responsive-carousel`,
    ]
}
