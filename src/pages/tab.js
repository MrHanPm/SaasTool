import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'


export default class Navbar extends Component {
  render () {
    return (
      <div className="head-tab">
        <IndexLink to='/' activeClassName="selected">全款</IndexLink>
        <Link to='/all' activeClassName="selected">贷款</Link>
      </div>
    )
  }
}

