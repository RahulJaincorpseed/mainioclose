import React from "react"
import "./HomeNavbar.scss"
import { Link } from "react-router-dom"
import logoImage from "../Images/main-logo.png"

const HomeNavbar = () => {
  return (
    <div className="container main-web-logo logo-container">
      <div className="logo">
        <div className="erp-image">
          <img className="main-logo-image" src={logoImage} />
        </div>
        <h2 className="erp-text">ERP</h2>
      </div>
      {/* <div className="main-logo">
        <h1>Logo</h1>
        
      </div> */}
      <div>
        <ul className="main-nav-items">
          <li>
            <Link className="single-link" to="/">
              Partner
            </Link>
          </li>
          <li>
            <Link className="single-link" to="/">
              company
            </Link>
          </li>
          <li>
            <Link className="single-link" to="/erp/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HomeNavbar
