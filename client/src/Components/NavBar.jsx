import React from 'react'
import {Link} from 'react-router-dom'
const NavBar = () => {
  return (
    <>
     <h6>Nav Bar</h6> 
     <ul>
        <li><Link to={'/'}>Navbar</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/signup'}>Signup</Link></li>
        <li><Link to={'/create'}>Create</Link></li>
     </ul>
    </>
  )
}

export default NavBar
