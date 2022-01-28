import React from 'react'
import Figure from './Figure'

const serializers = {
  container: ({ children }) => <React.Fragment>{children}</React.Fragment>,
  types: {
    image: Figure,
  },
  marks: {
  }
}

export default serializers
