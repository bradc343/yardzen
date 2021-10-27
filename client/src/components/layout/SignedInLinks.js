import React from 'react'
import { NavLink } from 'react-router-dom'

function SignedInLinks() {

  const signOut = () => {
    console.log("signOut")
    // signout functionality
  }

  return (
    <div>
      <div class="dropdown">
        <button class="dropbtn fa" style={window.innerWidth > 600 && window.innerWidth < 900 ? { fontSize: "1.5em", marginTop: "17%" } : { fontSize: "1.5em", marginTop: "3%" }}>&#xf0c9;</button>
        <div class="dropdown-content1">
          <NavLink to='/' style={{ fontSize: "1.5vh" }}>Home</NavLink>
          <a className="colorChange" style={{ fontSize: "1.5vh", borderTop: "1px solid", fontWeight: "600" }} onClick={() => signOut()}>Log Out</a>
        </div>
      </div>
    </div>
  )
}

export default SignedInLinks
