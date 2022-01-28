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

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  const result = await graphql(`
{
  allSanityPost {
    edges {
      node {
        slug {
          current
        }
        title
        body {
          _key
          style
          _rawChildren
          _type
          list
          children {
            text
            marks
            _type
            _key
          }
        }
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
				node: edge.node,
			},
    })
  })
}
