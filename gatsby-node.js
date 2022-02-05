const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	// Query for all products in Shopify
	const result = await graphql(`
    query {
      allShopifyProduct(sort: { fields: [title] }) {
        edges {
          node {
            title
            images {
              originalSrc
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
          }
        }
      }
    }
  `)
	// Iterate over all products and create a new page using a template
	// The product "handle" is generated automatically by Shopify
	result.data.allShopifyProduct.edges.forEach(({ node }) => {
		createPage({
			path: `/products/${node.handle}`,
			component: path.resolve(`./src/templates/product.js`),
			context: {
				product: node,
			},
		})
	})
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const result = await graphql(`
{
  allSanityPost {
    edges {
      node {
        slug {
          current
        }
        title
				_rawBody
        author {
          name
        }
      }
    }
  }
}
 `)

	if (result.errors) {
		throw result.errors
	}

	const projects = result.data.allSanityPost.edges || []
	projects.forEach((edge, index) => {
		const path = `/posts/${edge.node.slug.current}`

		createPage({
			path,
			component: require.resolve('./src/templates/post.js'),
			context: {
				slug: edge.node.slug.current,
				title: edge.node.title,
				author: edge.node.author.name,
				body: edge.node._rawBody,
			},
		})
	})
}

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions

	const result = await graphql(`
{
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

	if (result.errors) {
		throw result.errors
	}

	const projects = result.data.allSanityPage.edges || []
	projects.forEach((edge, index) => {
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
}


// exports.createPages = async ({ graphql, actions }) => {

// 	const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

// 	const { createPage } = actions

// 	const result = await graphql(`
// query MyQuery {
//   allSanityPdf {
//     edges {
//       node {
//         file {
//           asset {
//             url
//             id
//           }
//         }
//       }
//     }
//   }
// }
//  `)

// 	const projects = result.data.allSanityPdf.edges || []

// 	projects.forEach(async (edge) => {

// 	 await createRemoteFileNode({
// 			url: edge.node.file.asset.url,
// 			parentNodeId: edge.node.file.asset.id,
// 			getCache,
// 			createNode,
// 			createNodeId
// 	 })

// 		const path = `/${result.edge.node.file.asset.id}`

// 		createPage({
// 			path,
// 			component: require.resolve('./src/templates/pdf.js'),
// 			context: {
// 			},
// 		})
// 	})
// }

// exports.onCreateNode = async ({
// 	node,
// 	actions: { createNode },
// 	createNodeId,
// 	getCache,
// }) => {
// 	if (node.internal.type === "SanityPdf") {
// 		console.log(node)
// 		const url = 'https://cdn.sanity.io/files/3u2gq4se/tbt/' + node.file.asset._ref.slice(5, -4) + '.pdf';
// 		node.pdfFile = await createRemoteFileNode({
// 			url: url,
// 			parentNodeId: node._id,
// 			createNode,
// 			createNodeId,
// 			getCache
// 		})
// 		console.log(node.pdfFile)
// 	}
// }
// exports.createResolvers = async ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   store,
//   reporter,
// }) => {
//   const { createNode } = actions

//   await createResolvers({
//     sanityPdf: {
//       file: {
//         type: 'File',
//         async resolve(source, args, context, info) {
//           let sourceUrl = `http://localhost:1337${source.url}`
//           return await createRemoteFileNode({
//             url: encodeURI(sourceUrl),
//             store,
//             cache,
//             createNode,
//             createNodeId,
//             reporter,
//           })
//         },
//       },
//     },
//   })
// }
