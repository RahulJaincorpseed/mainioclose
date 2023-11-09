import React from "react"
import { Link } from "react-router-dom"

const SetNewPasswordPage = () => {
  return (
    <div className="cm-box container">
      <h2 className="cm-heading">Set Password</h2>
      <div>
        <div className="cm-input-box">
          <i className="fa-regular cm-icon fa-eye-slash"></i>
          <input
            className="cm-input"
            type="password"
            //   ref={emailRef}
            name="email"
            //   onChange={(e) => userInfo(e)}
            placeholder="Enter Your password"
          />
        </div>
        {/* {emailErr ? <p className="errors-new">Email ID can't be Blank</p> : ""}
      {emailProperErr ? (
        <p className="errors-new">Email not in Proper Format</p>
      ) : (
        ""
      )} */}
      </div>
      {/* {emailErr ? <p></p>} */}
      {/* //  {emailFormatErr ?  <p className="errors-new">Email not in Proper Format</p> : "" } */}
      <div>
        <div className="cm-input-box">
          <i className="fa-regular cm-icon fa-eye-slash"></i>
          <input
            className="cm-input"
            type="password"
            placeholder="Enter Your Confirm Password"
            //   ref={passwordRef}
            name="password"
            //   onChange={(e) => userInfo(e)}
          />
        </div>
        {/* {passwordErr ? (
        <p className="errors-new">password can't be Blank</p>
      ) : (
        ""
      )} */}
      </div>
      {/* <div className="remember"> */}
      {/* <div className="agree-text">
        <input className="box-input" type="checkbox" id="terms" />
        <label className="box-label m-0" htmlFor="terms">
          Remember me
        </label>
      </div> */}
      {/* <div>
        <Link to="/erp/forgetpassword">Forget Passowrd</Link>
      </div> */}
      {/* </div> */}
      <button className="login-button my-3">Submit Password</button>
      {/* <p className="note-user">
      Back to {" "}
      <Link className="ml-1 out-none" to="/erp/login">
        login
      </Link>
    </p> */}
    </div>
  )
}

export default SetNewPasswordPage
