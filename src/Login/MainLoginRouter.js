import React from "react"
import { Outlet } from "react-router-dom"
import "./Login.scss"
import logoImage from "../Images/main-logo.png"
import "./MainLoginRoute.scss"

const MainLoginRouter = () => {
  return (
    <div>
      <div className="container logo-header">
        {/* <h1 className="logo-icon">Logo</h1> */}
        <div className="logo">
          <div className="erp-image">
            <img className="main-logo-image" src={logoImage} />
          </div>
          <h2 className="erp-text">ERP</h2>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default MainLoginRouter
