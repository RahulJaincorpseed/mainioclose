import React, { useRef } from "react"
import "./EnquirySend.scss"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { postQuery } from "../API/PostQuery"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
toast.configure()

const EnquirySend = () => {
  const [openTab, setOpenTab] = useState(false)
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const currentPath = location.pathname.split()
  const splitPath = currentPath[0].split("/")
  const currentUserId = Number(splitPath[2])

  const [EnquiryTicketData, setEnquiryTicketData] = useState({
    userId: currentUserId,
    description: "",
    subject: "",
  })

  const subjectRef = useRef()
  const descriptionRef = useRef()

  const ticketInfo = (e) => {
    setEnquiryTicketData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const submitTicketFun = (e) => {
    e.preventDefault()

    const submitTicketData = async () => {
      setLoading(true)
      try {
        const ticket = await postQuery(
          `/leadService/api/v1/createTicket`,
          EnquiryTicketData
        )
        console.log("ticket response", ticket)
        toast.success("Message Submit Sucessfully...")
        subjectRef.current.value = ""
        descriptionRef.current.value = ""

        setLoading(false)
      } catch (err) {
        console.log("err", err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong...")
        }
        setLoading(false)
      }
    }
    submitTicketData()
  }

  console.log("Ticket Data", EnquiryTicketData)

  return (
    <div>
      <div className="enquiry">
        <p className="m-0" onClick={() => setOpenTab((prev) => !prev)}>
          <i className="fa-regular fa-circle-question"></i>
        </p>
        {openTab ? (
          <form>
            <div className="enq-tab">
              <p className="my-2 lead-heading enq-title">
                Get in touch by filling out the form below
              </p>
              <input
                className="enq-subject hide-design-box my-2"
                type="text"
                placeholder="Write subject Here..."
                name="subject"
                ref={subjectRef}
                onChange={(e) => ticketInfo(e)}
              />
              <textarea
                className="enq-message  hide-design-box my-2"
                placeholder="Write Message here..."
                name="description"
                ref={descriptionRef}
                onChange={(e) => ticketInfo(e)}
              ></textarea>
              <button
                className="action-btn"
                onClick={(e) => submitTicketFun(e)}
              >
                {loading ? "Loading" : "Send"}
              </button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default EnquirySend
