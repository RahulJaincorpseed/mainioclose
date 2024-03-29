import React, { useRef, useState } from "react"
import "./Login.scss"
import { image1 } from "../Images/imageFile"
import corpseedlogo from "../Images/corpseed-logo.png"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {
  currentUserAction,
  userInformation,
  userToken,
  userTokenAction,
} from "../Redux/Action/AuthAction"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { postQuery } from "../API/PostQuery"
import ButtonTwo from "../components/button/ButtonTwo"
import LongButton from "../components/button/LongButton"
import InputErrorComponent from "../components/InputErrorComponent"
toast.configure()

const Login = () => {
  // let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
  // if (regex.test(emailRef.current.value) !== true) {
  //   emailRef.current.style.border = "1px solid red"
  //   setEmailProperErr(true)
  //   setEmailErr(false)
  // }

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  })

  const [emailErr, setEmailErr] = useState(false)
  const [emailProperErr, setEmailProperErr] = useState(false)
  const [passwordErr, setPasswordErr] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loadingBtn, setLoadingBtn] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userInfo = (e) => {
    setUserLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const CurrentuserData = useSelector((prev) => prev.AuthReducer)


  const userSignIn = (e) => {
    e.preventDefault()

    if(loadingBtn === true){
      return 
    }

    setUserLoginData((data) => ({...data, password: data.password.trim()}))

   
    if (emailRef.current.value === "") {
      emailRef.current.style.border = "1px solid red"
      setEmailErr(true)
    }
    if (passwordRef.current.value === "") {
      passwordRef.current.style.border = "1px solid red"
      setPasswordErr(true)
    }
    setLoadingBtn(true)
    const loginUser = async () => {
      try {
        const collectUserData = await postQuery(
          `/securityService/api/auth/signin`,
          userLoginData
        )
        dispatch(currentUserAction(collectUserData.data))
        dispatch(userTokenAction(collectUserData.data.jwt))
        setLoadingBtn(false)
        localStorage.setItem("Access-token", collectUserData.data.jwt)
        navigate(`/erp/${collectUserData.data.id}/sales`)
      } catch (err) {
        if (err.response.status === 401) {
          toast.error("Enter a valid username or password")
          setLoadingBtn(false)
        }
        if (err.response.status === 500) {
          toast.error("please Referesh this page or try again later")
          setLoadingBtn(false)
        }
        setLoadingBtn(false)
      }
    }

    loginUser()
  }


  return (
    <div className="cm-box container">
      <h2 className="cm-heading">Login</h2>
      <div>
        <div className="cm-input-box">
          <i className="cm-icon fa-solid fa-user"></i>
          <input
            className="cm-input"
            type="text"
            ref={emailRef}
            name="email"
            onChange={(e) => userInfo(e)}
            placeholder="Enter Your Email"
          />
        </div>
        {emailErr ? <p className="errors-new">Email ID can't be Blank</p> : ""}
        {emailProperErr ? (
          <InputErrorComponent value="Email not in Proper Format" />
        ) : (
          ""
        )}
      </div>
      <div>
        <div className="cm-input-box">
          {showPassword ? (
            <i
              onClick={() => setShowPassword((prev) => !prev)}
              className="fa-solid cm-icon fa-eye"
            ></i>
          ) : (
            <i
              onClick={() => setShowPassword((prev) => !prev)}
              className="fa-regular cm-icon fa-eye-slash"
            ></i>
          )}
          <input
            className="cm-input"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your password"
            ref={passwordRef}
            name="password"
            onChange={(e) => userInfo(e)}
          />
        </div>
        {passwordErr ? (
          <InputErrorComponent value="Password can't be Blank" />
        ) : (
          ""
        )}
      </div>
      <div className="remember">
        <div className="agree-text">
          <input className="box-input" type="checkbox" id="terms" />
          <label className="box-label m-0" htmlFor="terms">
            Remember me
          </label>
        </div>
        <div>
          <Link to="/erp/forgetpassword">Forget Password ?</Link>
        </div>
      </div>
      <LongButton
        data={loadingBtn ? "Loading..." : "Login"}
        onClick={(e) => userSignIn(e)}
        className={`my-3`}
      />
      {/* <p className="note-user">
        Not a User{" "}
        <Link className="ml-1 out-none" to="/erp/signup">
          Signup
        </Link>
      </p> */}
    </div>
  )
}

export default Login
