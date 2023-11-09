import React, { useRef, useState } from "react"
import "./CommonData.scss"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import {
  forgetPasswordAction,
  userIsPresentData,
} from "../Redux/Action/AuthAction"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const ForgetPassword = () => {
  const [emailData, setEmailData] = useState("")
  const [emailErr, setEmailErr] = useState(false)
  const [emailFormat, setEmailFormat] = useState(false)
  const [emailNotExist, setEmailNotExist] = useState(false)
  const [loading, setLoading] = useState(false)

  const emailRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const forgetOtpResponse = useSelector(
    (auth) => auth.AuthReducer.forgetPassword
  )
  const isUserData = useSelector((user) => user.AuthReducer)

  // console.log("forget redux", forgetOtpResponse);
  console.log("is user data", isUserData)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailRef.current.value === "") {
      setEmailErr(true)
      setEmailFormat(false)
      return
    }
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}")
    if (regex.test(emailRef.current.value) !== true) {
      setEmailFormat(true)
      setEmailErr(false)
    }
    setLoading(true)
    const forgetPass = async () => {
      try {
        // const passwordOtp = await axios.post(`/auth/forgetOtp`,{...emailData, } )
        const passwordOtp = await axios.post(
          `/securityService/api/auth/forgetOtp?email=${emailData}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        console.log("forget response", passwordOtp.data)
        dispatch(forgetPasswordAction(passwordOtp.data))
        setLoading(false)

        navigate("/erp/forgetotp")
      } catch (err) {
        console.log(err.response.status)
        if (err.response.status === 500) {
          toast.error("Something Went wrong")
          setLoading(false)
        }
        if (err.response.status === 401) {
          setEmailNotExist(true)
          setLoading(false)
        }
        setLoading(false)
      }
    }

    // const userIsExist = async () => {
    //   try {
    //     const userIsPresent = await axios(
    //       `/auth/isUserExistOrNot?email=${emailData}`
    //     )
    //     console.log("user Present", userIsPresent.data)
    //     dispatch(userIsPresentData(userIsPresent.data))
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    forgetPass()
    // userIsExist()
  }

  console.log("email data", emailData)

  return (
    <form>
      <div className="cm-box container">
        <h2 className="cm-heading">Forget Password</h2>
        <div className="cm-input-box">
          <i className="fa-regular cm-icon fa-envelope"></i>
          <input
            className="cm-input"
            ref={emailRef}
            type="text"
            onChange={(e) => setEmailData(e.target.value)}
            placeholder="Enter Your Email"
          />
        </div>
        {emailErr ? <p className="errors-new">Email can't be blank</p> : ""}
        {emailFormat ? (
          <p className="errors-new">Email Not in Proper Format</p>
        ) : (
          ""
        )}
        {emailNotExist ? (
          <p className="errors-new">Email Not Found in System </p>
        ) : (
          ""
        )}
        <button onClick={(e) => handleSubmit(e)} className="login-button">
          Continue
        </button>
      </div>
    </form>
  )
}

export default ForgetPassword
