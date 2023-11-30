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
        <Polygon item={123} />
      </div>
    )
  }
}

export default Layout
