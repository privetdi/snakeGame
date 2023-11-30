import React from 'react'
import Polygon from './polygon'

class Layout extends React.Component {
  constructor(props: {}) {
    super(props)
    this.state = { clicked: false }
  }

  render() {
    return (
      <div>
        <Polygon />
      </div>
    )
  }
}

export default Layout
