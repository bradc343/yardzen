import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

class Navbar extends Component {
  componentDidMount = async (props) => {
    window.addEventListener('resize', this.resize)  
  }
  
  resize = () => this.forceUpdate()
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  showSettings = (event) => {
    event.preventDefault();
  }

  render() {
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
    return (
      <nav id="thenavbar" className="nav-wrapper" style={{ borderRadius: "4px", width: "20%", position: "fixed", left: "0", zIndex: 99, top: "0", height: "-webkit-fill-available" }}>

        <div style={{ padding: "20px",marginTop: "70px" }}>
          {/* {window.innerWidth < 900 ? <Link to='/' style={{fontSize: "2.1rem", marginLeft: "-4%"}}><img alt="doubleEagle" src={icon} width={129} height={20} /></Link> : null} */}
          {links}
        </div>
      </nav>
    )
  }
}


export default Navbar
