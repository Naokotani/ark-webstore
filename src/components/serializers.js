import React from 'react'
import Figure from './Figure'
import PortableLink from './PortableLink';
import PdfLink from './PdfLink'
import House from './House'

const serializers = {
	container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
	types: {
		image: Figure,
		house: House,
	},
	marks: {
		link: ({ children, mark }) =>
			mark.blank ? (
				<a href={mark.href} target="_blank" rel="noreferrer">
					{children}
				</a>
			) : (
				<a href={mark.href}>
					{children}
				</a>
			),
		pageLink: PortableLink,
		pdfLink: PdfLink,
	}
}

export default serializers
