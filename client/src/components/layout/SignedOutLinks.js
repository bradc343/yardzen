import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
// import { signOut } from '../../store/actions/authActions'

class SignedOutLinks extends Component {
  componentDidMount = async () => {
    window.addEventListener('resize', this.resize)
  }

  resize = () => this.forceUpdate()

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  render() {
    if (window.innerWidth > 900) {
      return (
        <div>
          <ul style={{ display: "flex", margin: "0 auto", flexDirection: "column" }}>
            <li><NavLink to='/' style={{ fontSize: "1vw" }}>Home</NavLink></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <div class="dropdown">
            <button class="dropbtn fa" style={window.innerWidth > 600 && window.innerWidth < 900 ? {fontSize: "1.5em", marginTop: "17%"} : {fontSize: "1.5em", marginTop: "3%"}}>&#xf0c9;</button>
            <div class="dropdown-content1">
              <NavLink to='/' style={{ fontSize: "1.5vh" }}>Home</NavLink>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default SignedOutLinks