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
import InputErrorComponent from "../components/InputErrorComponent"
import ButtonTwo from "../components/button/ButtonTwo"
import LongButton from "../components/button/LongButton"
toast.configure()

const ForgetPassword = () => {
  const [emailData, setEmailData] = useState("")
  const [emailErr, setEmailErr] = useState(false)
  const [emailFormat, setEmailFormat] = useState(false)
  const [emailNotExist, setEmailNotExist] = useState(false)
  const [loading, setLoading] = useState(false);

  const emailRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const forgetOtpResponse = useSelector(
    (auth) => auth.AuthReducer.forgetPassword
  )
  const isUserData = useSelector((user) => user.AuthReducer)

  
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
        const passwordOtp = await axios.post(
          `/securityService/api/auth/forgetOtp?email=${emailData}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        dispatch(forgetPasswordAction(passwordOtp.data))
        setLoading(false)
        navigate("/erp/forgetotp")
      } catch (err) {
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

    forgetPass()
  }

 
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
          <InputErrorComponent  value="Email Not in Proper Format"/>
        ) : (
          ""
        )}
        {emailNotExist ? (
           <InputErrorComponent value="Email Not Found in System" />
        ) : (
          ""
        )}
        <LongButton onClick={(e) => handleSubmit(e)}  data="Continue" />
      </div>
    </form>
  )
}

export default ForgetPassword
