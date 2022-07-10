import * as React from 'react';
import Layout from '../components/Layout'
import House from '../components/House'

const Houses = ({ data }) => {

	return (
		<Layout>
			<House page={true} />
		</Layout>
	);
};

// export const query = graphql`
// 	query {
//     allSanityHouse {
//       edges {
//         node {
//           id
// 					address
//           mainImage {
//             asset {
//               id
//                 }
//             }
//             title
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
// `


export default Houses;
