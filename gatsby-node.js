const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	// Create Pages for shopify
	const shop = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            title
						featuredImage{
							gatsbyImageData
						}
            shopifyId
            handle
            description
            priceRangeV2 {
              maxVariantPrice {
                amount
              }
              minVariantPrice {
                amount
              }
            }
            status
						variants {
							shopifyId
						}
          }
        }
      }
    }
  `)
	// Iterate over all products and create a new page using a template
	// The product "handle" is generated automatically by Shopify
	shop.data.allShopifyProduct.edges.forEach(({ node }) => {
		createPage({
			path: `/products/${node.handle}`,
			component: path.resolve(`./src/templates/product.js`),
			context: {
				product: node,
			},
		})
	})

	//Create pages for personal profiles.
	const personQuery = await graphql(`
query {
  allSanityPerson {
    edges {
      node {
        role
        name
        mainImage {
          asset {
            _id
            gatsbyImageData
          }
        }
        slug {
          current
        }
        _rawBio
      }
    }
  }
}
 `)

	if (personQuery.errors) {
		throw personQuery.errors
	}

	const people = personQuery.data.allSanityPerson.edges || []
	people.forEach((edge) => {
		const path = `/profile/${edge.node.slug.current}`

		createPage({
			path,
			component: require.resolve('./src/templates/person.js'),
			context: {
				role: edge.node.role,
				name: edge.node.name,
				image: edge.node.mainImage,
				slug: edge.node.slug.current,
				body: edge.node._rawBio,
			},
		})
	})

	//Create generic pages
	const pageQuery = await graphql(`
query {
  allSanityPage {
    edges {
      node {
        slug {
          current
        }
        title
				_rawBody
        }
      }
    }
  }
 `)

	if (pageQuery.errors) {
		throw pageQuery.errors
	}

	const pages = pageQuery.data.allSanityPage.edges || []
	pages.forEach((edge) => {
		const path = `/${edge.node.slug.current}`

		createPage({
			path,
			component: require.resolve('./src/templates/page.js'),
			context: {
				slug: edge.node.slug.current,
				title: edge.node.title,
				body: edge.node._rawBody,
			},
		})
	})

	//Create generic pages
	const subPageQuery = await graphql(`
query {
  allSanitySubpage {
    edges {
      node {
        parentPage {
          slug {
            current
          }
        }
        _rawBody
        link
        tab
        title
        slug {
          current
        }
      }
    }
  }
}
 `)

	if (subPageQuery.errors) {
		throw subPageQuery.errors
	}

	const subPages = subPageQuery.data.allSanitySubpage.edges || []
  subPages.forEach((edge) => {
		const path = `/${edge.node.parentPage.slug.current}/${edge.node.slug.current}`

		createPage({
			path,
			component: require.resolve('./src/templates/subPage.js'),
			context: {
				title: edge.node.title,
				body: edge.node._rawBody,
			},
		})
	})
	
	// Create News and events pages
	const postQuery = await graphql(`
{
  allSanityPost {
    edges {
      node {
        slug {
          current
        }
        title
        _rawBody
        mainImage {
          asset {
            _id
          }
        }
        publishedAt
        date(formatString: "dddd MMMM Do, YYYY hh:mma")
      }
    }
  }
}
  `)

	if (postQuery.errors) {
		throw postQuery.errors
	}

	const posts = postQuery.data.allSanityPost.edges || []
	posts.forEach((edge, index) => {
		const path = `/post/${edge.node.slug.current}`

		createPage({
			path,
			component: require.resolve('./src/templates/post.js'),
			context: {
				slug: edge.node.slug.current,
				title: edge.node.title,
				published: edge.node.publishedAt,
				date: edge.node.date,
				image: edge.node.mainImage,
				body: edge.node._rawBody,
			},
		})
	})
}
