import React, { useEffect, useState } from "react"
import "./LeadDetailsPage.scss"
import FilterButton from "../../../components/FilterButton"
import { Link, useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { getQuery } from "../../../API/GetQuery"
import { postQuery } from "../../../API/PostQuery"
import { useRef } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import Skeleton from "@mui/material/Skeleton"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import DataShowScalaton from "../../../components/Scalaton/DataShowScalaton"
import EstimateDesignPage from "../Leads/EstimateDesignPage"
import { useCustomRoute } from "../../../Routes/GetCustomRoutes"
import { useSelector } from "react-redux"
import PopUpButton from "../../../components/button/PopUpButton"
import { putQuery } from "../../../API/PutQuery"
import { deleteQuery } from "../../../API/DeleteQuery"
toast.configure()

// data-toggle="tooltip" data-placement="top" title="Tooltip on top"

const LeadDetailsPage = () => {
  const [notes, setNotes] = useState(false)
  const [email, setEmail] = useState(true)
  const [sms, setSms] = useState(true)
  const [notes1, setNotes1] = useState(false)
  const [notesApiData, setNotesApiData] = useState([])
  const [messageData, setMessageData] = useState("")
  const [singleLeadResponseData, setSingleLeadResponseData] = useState({})
  const [categoryData, setCategoryData] = useState([])
  const [getAllStatus, setGetAllStatus] = useState([])
  const [allOportunities, setAllOportunities] = useState([])

  const [singleStatus, setSingleStatus] = useState("")
  const [notesUpdateToggle, setNotesUpdateToggle] = useState(false)
  const [changeStatusToggle, setChangeStatusToggle] = useState(false)
  const [updateLeadNameToggle, setUpdateLeadNameToggle] = useState(true)
  const [leadStatusScale, setLeadStatusScale] = useState(false)
  const [taskUpdateToggle, setTaskUpdateToggle] = useState(false)
  const [updateLeadName, setUpdateLeadName] = useState("")
  const [notesLoading, setNotesLoading] = useState(false)
  const [contactDelDep, setContactDelDep] = useState(false)

  const [productDataScaleaton, setProductDataScaleaton] = useState(true)
  const [leadNameReload, setLeadNameReload] = useState(false)

  const [allProductData, setAllProductData] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const [productDisplayToggle, setProductDisplayToggle] = useState(false)

  const [clientsContact, setClientsContact] = useState([])

  const [clientContactToggle, setClientContactToggle] = useState(false)
  const [allProductsList, setAllProductsList] = useState([])

  const [getAllLeadUserData, setGetAllLeadUserData] = useState([])

  const [allTaskStatusData, setAllTaskStatusData] = useState([])

  const [getSingleLeadTask, setGetSingleLeadTask] = useState([])

  const [userDataResponse, setUserDataResponse] = useState([])
  const [estimateOpenBtn, setEstimateOpenBtn] = useState(false)

  const [taskReferesh, setTaskReferesh] = useState(false)
  const [productDepandence, setProductDepandence] = useState(false)
  const [editTaskDep, setEditTaskDep] = useState(false)
  const [editContactDep, setEditContactDep] = useState(false)

  const [updateAssignee, setUpdateAssignee] = useState(false)
  // const [updateTaskDataState, setUpdateTaskDataState] = useState()
  // const [EditTaskStatus, setEditTaskStatus] = useState(false)

  const openEstimateFun = () => {
    setEstimateOpenBtn((prev) => !prev)
  }

  const { userid, leadid } = useParams()

  // //  useEffect calls Start
  useEffect(() => {
    editViewData()
    getAllProductWithCattegory()
    getAllStatusData()
  }, [])

  useEffect(() => {
    getSingleLeadData()
  }, [
    changeStatusToggle,
    leadNameReload,
    productDisplayToggle,
    clientContactToggle,
    productDepandence,
    editContactDep,
    contactDelDep,
    updateAssignee,
  ])

  useEffect(() => {
    leadNotesData()
  }, [notesUpdateToggle])

  useEffect(() => {
    getAllProductData()
  }, [])

  useEffect(() => {
    getAllLeadUser()
  }, [])

  useEffect(() => {
    getAllTaskStatus()
  }, [])

  useEffect(() => {
    getAllTaskData()
  }, [taskUpdateToggle, taskReferesh, editTaskDep])

  useEffect(() => {
    getAllOportunities()
  }, [])

  useEffect(() => {
    getAllUserData()
  }, [])

  const currentUserRoles = useSelector(
    (prev) => prev.AuthReducer.currentUser.roles
  )
  const adminRole = currentUserRoles.includes("ADMIN")

  //  useEffect calls End

  const getAllOportunities = async () => {
    const getOportunities = await getQuery(
      `/leadService/api/v1/leadOpportunity/getAllOpportunity`
    )
    setAllOportunities(getOportunities.data)
  }

  const NotesRef = useRef()
  const contactNameRef = useRef()
  const contactEmailRef = useRef()
  const contactContactNoRef = useRef()

  const taskTitle = useRef()
  const taskDescription = useRef()
  const taskDate = useRef()
  const location = useLocation()

  const categorySelectRef = useRef()

  const [remarkMessage, setRemarkMessage] = useState({
    leadId: leadid,
    userId: userid,
    message: messageData,
  })

  const [addProductData, setAddProductData] = useState({
    productId: "",
    leadId: leadid,
    serviceName: "",
  })

  const [createContact, setCreateContact] = useState({
    currentUserId: userid,
    leadId: leadid,
    name: "",
    contactNo: "",
    email: "",
  })

  const [addNewTask, setAddNewTask] = useState({
    leadId: leadid,
    name: "",
    description: "",
    assigneeId: 0,
    assignedById: userid,
    expectedDate: "",
    statusId: 0,
  })

  console.log("contact", createContact)

  const [EditNewTask, setEditNewTask] = useState({})

  const [editTaskBool, setEditTaskBool] = useState(false)
  const [editTaskValue, setEditTaskValue] = useState({})

  const updateTaskData = (task) => {
    setEditTaskBool(true)
    setAddNewTask((prev) => ({
      ...prev,
      currentUserId: userid,
      taskId: task.id,
      name: task.name,
      description: task.description,
      expectedDate: new Date(task.expectedDate).toISOString().slice(0, 16),
      statusId: task.statusId,
    }))
  }

  const editTaskFun = async (e) => {
    e.preventDefault()

    try {
      const EditData = await postQuery(
        `/leadService/api/v1/task/updateTaskData`,
        addNewTask
      )
      addNewTask.name = ""
      addNewTask.description = ""
      addNewTask.expectedDate = ""
      setEditTaskDep((prev) => !prev)
      // window.location.reload();
    } catch (err) {
      console.log(err)
    }
    setEditTaskBool(false)
    setEditTaskValue(addNewTask)
  }

  // GET All tasks Status
  const getAllTaskStatus = async () => {
    try {
      const allTaskStatus = await axios.get(
        `/leadService/api/v1/getAllTaskStatus`
      )
      setAllTaskStatusData(allTaskStatus.data)
      setLeadStatusScale(true)
    } catch (err) {
      setLeadStatusScale(false)
    }
  }

  // GET All Product Data
  const getAllProductData = async () => {
    try {
      const allProductResponse = await getQuery(
        `/leadService/api/v1/product/getAllProducts`
      )
      setAllProductData(allProductResponse.data)
    } catch (err) {
      console.log(err)
    }
  }

  // Get All Lead User
  const getAllLeadUser = async () => {
    try {
      const allLeadUser = await axios.get(
        `/leadService/api/v1/users/getAllUserByHierarchy?userId=${userid}`
      )
      setGetAllLeadUserData(allLeadUser.data)
    } catch (err) {
      console.log(err)
    }
  }

  // set Inputs data
  const setTasksDataFun = (e) => {
    setAddNewTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const setContactDataFun = (e) => {
    setCreateContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const remarkMessageFunction = (e) => {
    setRemarkMessage((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // get All Products

  const ProductUrl = `/leadService/api/v1/product/getAllProducts`
  const depandent = []

  const { productData, loading, error } = useCustomRoute(ProductUrl, depandent)

  // END

  const getCatgegoryInputData = (categorySelect) => {
    setAddProductData((product) => ({
      ...product,
      serviceName: categorySelect,
    }))
  }

  // const {id} = useParams();
  // GET All Tasks Data
  const getAllTaskData = async () => {
    try {
      const allTaskData = await getQuery(
        `/leadService/api/v1/task/getAllTaskByLead?leadId=${leadid}`
      )
      setGetSingleLeadTask(allTaskData.data)
    } catch (err) {
      console.log("err", err)
    }
  }

  const getProductInputData = (productIdSelect) => {
    setAddProductData((product) => ({ ...product, productId: productIdSelect }))
  }

  // GET All LeadNotes data
  const leadNotesData = async (id) => {
    try {
      const getAllLeadNotes = await getQuery(
        `/leadService/api/v1/getAllRemarks?leadId=${leadid}`
      )
      const newData = getAllLeadNotes.data.reverse()
      setNotesApiData(newData)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
    }
  }

  const editViewData = async () => {
    try {
      const viewData = await axios.get(
        `/leadService/api/v1/inbox/editView?leadId=${leadid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  // GET Single Lead Data
  const getSingleLeadData = async () => {
    try {
      const singleLeadApiData = await getQuery(
        `/leadService/api/v1/lead/getSingleLeadData?leadId=${leadid}`
      )
      setSingleLeadResponseData(singleLeadApiData.data)
      setAllProductsList(singleLeadApiData.data.serviceDetails)
      setUpdateLeadName(singleLeadApiData.data.leadName)
      setClientsContact(singleLeadApiData.data.clients)
      setProductDataScaleaton(false)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
      setProductDataScaleaton(false)
      // productDataScaleaton(false)
    }
  }

  // Change Lead Status Function
  const changeLeadStatusFun = (catId) => {
    const statusChange = async () => {
      try {
        const statusData = await axios.put(
          `/leadService/api/v1/status/updateLeadStatus?leadId=${leadid}&statusId=${catId}&currentUserId=${userid}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        setChangeStatusToggle((prev) => !prev)
      } catch (err) {
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
        }
      }
    }
    statusChange()
  }

  // Create New Notes or Remarks
  const createRemarkfun = (e) => {
    e.preventDefault()
    if (NotesRef.current.value === "") {
      toast.error("Notes Can't be Blank")
      return
    }
    const createNewRemark = async () => {
      setNotesLoading(true)
      try {
        const remarkData = await postQuery(
          `/leadService/api/v1/createRemarks`,
          remarkMessage
        )
        setNotesUpdateToggle((prev) => !prev)
        NotesRef.current.value = ""
        setNotesLoading(false)
      } catch (err) {
        console.log(err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
          setNotesLoading(false)
        }
        setNotesLoading(false)
      }
    }
    createNewRemark()
  }

  // GET All Products With Category
  const getAllProductWithCattegory = async () => {
    try {
      const getCategory = await getQuery(
        "/leadService/api/v1/category/getAllCategories"
      )
      setCategoryData(getCategory.data)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
    }
  }

  const deleteProductFun = async (e, serviceId) => {
    try {
      const productDelete = await axios.put(
        `/leadService/api/v1/lead/deleteProductInLead?leadId=${leadid}&serviceId=${serviceId}&userId=${userid}`
      )
      toast.success("product Deleted Sucessfully")
      setProductDepandence((prev) => !prev)
    } catch (err) {
      console.log(err)
    }
  }

  // GET All Status data
  const getAllStatusData = async () => {
    try {
      const allStatus = await getQuery(
        `/leadService/api/v1/status/getAllStatus`
      )
      setGetAllStatus(allStatus.data)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }
    }
  }

  // Create Product For Single Lead
  const createProductInLeadFun = async (e) => {
    e.preventDefault()
    try {
      const updateLeadProducts = await axios.put(
        `/leadService/api/v1/lead/createProductInLead`,
        {
          ...addProductData,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setProductDisplayToggle((prev) => !prev)
    } catch (err) {
      console.log(err)
      if (err.response.status === 406) {
        toast.error("Product already added")
      }
      if (err.response.status === 500) {
        toast.error("Something Went Wrong")
      }
    }
  }

  const updateLeadNameSinglePage = async (e) => {
    try {
      const leadNameUpdate = await axios.put(
        `/leadService/api/v1/lead/updateLeadName?leadName=${updateLeadName}&leadId=${leadid}&userId=${userid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setUpdateLeadNameToggle(true)
      setLeadNameReload((prev) => !prev)
    } catch (err) {
      console.log(err)
      if (err.response.status === 500) {
        toast.error("Something Went Wrong")
      }
    }
  }

  // Create New Contact For Lead
  const createLeadContact = (e) => {
    e.preventDefault()
    const leadContact = async () => {
      try {
        const apiContactRes = await postQuery(
          `/leadService/api/v1/client/createClient`,
          createContact
        )
        setClientContactToggle((prev) => !prev)
        contactNameRef.current.value = ""
        contactEmailRef.current.value = ""
        contactContactNoRef.current.value = ""
        createContact.name = ""
        createContact.email = ""
        createContact.contactNo = ""
      } catch (err) {
        console.log("err", err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
        }
      }
    }
    leadContact()
  }

  // Create New Tasks for Lead Function
  const createTaskFun = (e) => {
    e.preventDefault()
    const TaskCreateNew = async () => {
      try {
        const taskCreateData = await postQuery(
          `/leadService/api/v1/task/createTask`,
          addNewTask
        )
        setTaskUpdateToggle((prev) => !prev)
        taskTitle.current.value = ""
        taskDescription.current.value = ""
        taskDate.current.value = ""
      } catch (err) {
        console.log("err", err)
        if (err.response.status === 500) {
          toast.error("Something Went Wrong")
        }
        return
      }
      addNewTask.name = ""
      addNewTask.description = ""
      addNewTask.expectedDate = ""
    }
    TaskCreateNew()
  }

  const getAllUserData = async () => {
    const allUserResponse = await getQuery(
      `/leadService/api/v1/users/getAllUserByHierarchy?userId=${userid}`
    )
    setUserDataResponse(allUserResponse.data)
  }

  const changeLeadAssignee = async (id) => {
    try {
      const updatePerson = await axios.put(
        `/leadService/api/v1/lead/updateAssignee?leadId=${leadid}&userId=${id}&updatedById=${userid}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setUpdateAssignee((prev) => !prev)
    } catch (err) {
      console.log("err", err)
    }
  }

  const deleteTaskFun = async (id) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const deleteTaskData = await deleteQuery(
          `/leadService/api/v1/task/deleteTaskById?taskId=${id}&currentUserId=${userid}`
        )
        setTaskReferesh((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const [editContactState, setEditContactState] = useState(false)

  const editContactData = (contact) => {
    setEditContactState(true)
    setCreateContact((prev) => ({
      id: contact.clientId,
      contactNo: contact.contactNo,
      email: contact.email,
      name: contact.clientName,
      userId: userid,
      leadId: leadid
    }))
  }

  const editExistContact = async (e) => {
    e.preventDefault()
    try {
      const editContactDetails = await putQuery(
        `/leadService/api/v1/client/updateClientInfo`,
        createContact
      )
      setEditContactState(false)
      setEditContactDep((prev) => !prev)
      createContact.name = ""
      createContact.email = ""
      createContact.contactNo = ""
    } catch (err) {
      console.log(err)
    }
  }

  const deleteContactFun = async (id) => {
    if (window.confirm("Are you sure to delete this record?") == true) {
      try {
        const deleteContactData = await deleteQuery(
          // `/leadService/api/v1/task/deleteTaskById?taskId=${id}&currentUserId=${userid}`
          `/leadService/api/v1/client/deleteClient?leadId=${leadid}&clientId=${id}`
        )
        setContactDelDep((prev) => !prev)
        // setTaskReferesh((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="lead-details cm-padding-one">
      {estimateOpenBtn ? (
        <EstimateDesignPage setEstimateOpenBtn={setEstimateOpenBtn} />
      ) : (
        ""
      )}
      <div className="row">
        <div className="col-md-4">
          <div className="left-lead-section">
            {updateLeadNameToggle ? (
              <>
                <h3 className="company-name d-inline">
                  {singleLeadResponseData?.leadName}
                </h3>
                <i
                  onClick={() => setUpdateLeadNameToggle(false)}
                  className="fa-solid ml-3 fa-pencil green-cl"
                ></i>
              </>
            ) : (
              <>
                <input
                  value={updateLeadName}
                  onChange={(e) => setUpdateLeadName(e.target.value)}
                  className="hide-design-box"
                  type="text"
                />
                {/* <button
                  className="small-cm-btn"
                  onClick={(e) => updateLeadNameSinglePage(e)}
                >
                  Save
                </button> */}
                <i
                  onClick={(e) => updateLeadNameSinglePage(e)}
                  className=" fa-solid green-cl disk-size fa-floppy-disk"
                ></i>
              </>
            )}
            <p className="lead-location">
              <i className="fa-solid mr-1 fa-location-dot"></i>
              {singleLeadResponseData?.city}
            </p>

            <p className="lead-blue-head">
              Assignee Person - {singleLeadResponseData?.assigne?.fullName}
            </p>
            <p className="lead-blue-head">
              Status - {singleLeadResponseData?.status?.name}
            </p>
            {leadStatusScale ? (
              <p className="my-2">
                <select
                  className="status-select"
                  name="status"
                  onChange={(e) => changeLeadStatusFun(e.target.value)}
                  id="status"
                  form="statusChange"
                >
                  <option>Change Lead Status</option>
                  {getAllStatus.map((status, index) => (
                    <option value={status.id} key={index}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </p>
            ) : (
              <Skeleton variant="rectangular" width={210} height={25} />
            )}
            <div></div>
            <div className="lead-product">
              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn collapsed"
                    data-toggle="collapse"
                    data-target="#contactCollapse"
                    aria-expanded="false"
                    aria-controls="contactCollapse"
                  >
                    <h3 className="lead-heading lead-bold">Contacts</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="contactCollapse"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <form>
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Name
                        </label>

                        <input
                          name="name"
                          value={
                            editContactState
                              ? createContact.name
                              : createContact.name
                          }
                          onChange={(e) => setContactDataFun(e)}
                          className="lead-cm-input"
                          ref={contactNameRef}
                          type="text"
                        />
                      </div>
                      {/* <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Title
                        </label>

                        <input className="lead-cm-input" type="text" />
                      </div> */}

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Contact Detail
                        </label>
                        <div className="my-details">
                          <i className="fa-solid fa-envelope"></i>
                          <input
                            name="email"
                            value={
                              editContactState
                                ? createContact.email
                                : createContact.email
                            }
                            onChange={(e) => setContactDataFun(e)}
                            className="lead-cm-input"
                            ref={contactEmailRef}
                            type="email"
                          />
                        </div>
                        <div className="my-details">
                          <i className="fa-solid fa-phone"></i>
                          <input
                            name="contactNo"
                            value={
                              editContactState
                                ? createContact.contactNo
                                : createContact.contactNo
                            }
                            onChange={(e) => setContactDataFun(e)}
                            className="lead-cm-input"
                            ref={contactContactNoRef}
                            type="text"
                          />
                        </div>
                      </div>

                      {/* <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Contact Role
                        </label>

                        <input className="lead-cm-input" type="text" />
                      </div> */}

                      <div className="lead-btn-box">
                        <button
                          type="reset"
                          className="lead-cm-btn lead-cancel-btn"
                        >
                          Reset
                        </button>

                        {editContactState ? (
                          <button
                            onClick={(e) => editExistContact(e)}
                            className="lead-cm-btn lead-save-btn"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={(e) => createLeadContact(e)}
                            className="lead-cm-btn lead-save-btn"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  {/* all leads save */}
                  <div className="min-box">
                    {clientsContact.map((client, index) => (
                      <div className="save-lead-data" key={index}>
                        <div>
                          <p className="lead-heading">
                            {client?.clientName
                              ? `${client?.clientName.slice(0, 30)}...`
                              : "NA"}
                          </p>
                          <h6 className="lead-sm-heading mb-0">
                            {client?.email
                              ? `${client?.email.slice(0, 30)}...`
                              : "NA"}
                          </h6>
                          <h6 className="lead-sm-heading ">
                            {client.contactNo
                              ? `${client.contactNo.slice(0, 20)}...`
                              : "NA"}
                          </h6>
                        </div>
                        <div className="lead-heading">
                          <i
                            className="fa-solid fa-pen mr-3"
                            onClick={() => editContactData(client)}
                          ></i>
                          {adminRole ? (
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteContactFun(client.clientId)}
                            ></i>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* all leads save */}
                </div>
              </div>

              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn collapsed"
                    data-toggle="collapse"
                    data-target="#TasksCollapse"
                    aria-expanded="false"
                    aria-controls="TasksCollapse"
                  >
                    <h3 className="lead-heading lead-bold">Tasks</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="TasksCollapse"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <form>
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Title
                        </label>
                        <input
                          className="lead-cm-input"
                          name="name"
                          value={
                            editTaskBool ? addNewTask?.name : addNewTask?.name
                          }
                          ref={taskTitle}
                          onChange={(e) => setTasksDataFun(e)}
                          type="text"
                        />
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Description
                        </label>

                        <textarea
                          className="lead-cm-input min-height-one"
                          onChange={(e) => setTasksDataFun(e)}
                          value={
                            editTaskBool
                              ? addNewTask?.description
                              : addNewTask?.description
                          }
                          name="description"
                          ref={taskDescription}
                          type="text"
                        ></textarea>
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          date
                        </label>

                        <input
                          className="lead-cm-input"
                          type="datetime-local"
                          value={
                            editTaskBool
                              ? addNewTask?.expectedDate
                              : addNewTask?.expectedDate
                          }
                          name="expectedDate"
                          ref={taskDate}
                          onChange={(e) => setTasksDataFun(e)}
                        />
                      </div>

                      {/* <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Assign user
                        </label>

                        <select
                          className="lead-cm-input"
                          name="assigneeId"
                          onChange={(e) => setTasksDataFun(e)}
                          id="select-product"
                        >
                          <option>Select User</option>
                          {getAllLeadUserData.map((user, index) => (
                            <option key={index} value={user?.id}>
                              {user?.fullName}
                            </option>
                          ))} */}

                      {/* <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option> */}
                      {/* </select> */}
                      {/* </div> */}
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Status
                        </label>

                        <select
                          className="lead-cm-input"
                          name="statusId"
                          onChange={(e) => setTasksDataFun(e)}
                          id="select-product"
                        >
                          <option>Select Status</option>
                          {allTaskStatusData.map((status, index) => (
                            <option key={index} value={`${status?.id}`}>
                              {status?.name}
                            </option>
                          ))}

                          {/* <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option> */}
                        </select>
                      </div>
                      <div className="lead-btn-box">
                        <button
                          type="reset"
                          className="lead-cm-btn lead-cancel-btn"
                        >
                          Reset
                        </button>
                        {editTaskBool ? (
                          <button
                            onClick={(e) => editTaskFun(e)}
                            className="lead-cm-btn lead-save-btn"
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={(e) => createTaskFun(e)}
                            className="lead-cm-btn lead-save-btn"
                          >
                            Save
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  {/* all leads save */}
                  <div className="min-box">
                    {getSingleLeadTask.map((task, index) => (
                      <div key={index} className="save-lead-data">
                        <div>
                          <p className="lead-heading">{task?.name}</p>
                          <h6 className="lead-sm-heading mb-1">
                            {task?.description}
                          </h6>
                          <h6 className="lead-sm-heading mb-1">
                            {task?.taskStatus?.name} -{" "}
                            {task?.assignedBy?.fullName}
                          </h6>
                          <h6 className="lead-sm-heading mb-1">
                            {new Date(task.expectedDate).toLocaleDateString()} -{" "}
                            {new Date(task.expectedDate).getHours()}:
                            {new Date(task.expectedDate).getMinutes()}
                          </h6>
                        </div>
                        <div className="lead-heading">
                          <i
                            onClick={() => updateTaskData(task)}
                            className="fa-solid fa-pen mr-3"
                          ></i>
                          {adminRole ? (
                            <i
                              onClick={() => deleteTaskFun(task.id)}
                              className="fa-solid fa-trash"
                            ></i>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* all leads save */}
                </div>
              </div>

              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <h3 className="lead-heading lead-bold">Product</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse show"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <form>
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product-category"
                        >
                          Select Product Category
                        </label>

                        <select
                          className="lead-cm-input"
                          // name="select-product-category"
                          id="select-product-category"
                          ref={categorySelectRef}
                          value={categoryData.categoryName}
                          // name="categoryName"
                          onChange={(e) =>
                            getCatgegoryInputData(e.target.value)
                          }
                        >
                          <option>Select Product Category</option>

                          {categoryData.map((cat, index) => (
                            <option key={index} value={cat.categoryName}>
                              {cat.categoryName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Select Product
                        </label>

                        <select
                          className="lead-cm-input"
                          name="select-product"
                          id="select-product"
                          onChange={(e) => getProductInputData(e.target.value)}
                        >
                          <option>Select Product</option>
                          {/* {categoryData.map((product, index) => (
                            <option key={index} value={product?.id}>
                              {product?.productName}
                            </option>
                          ))} */}
                          {productData.map((product, index) => (
                            <option key={index} value={product?.id}>
                              {product?.productName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="lead-btn-box">
                        <button
                          type="reset"
                          className="lead-cm-btn lead-cancel-btn"
                        >
                          Reset
                        </button>
                        <button
                          onClick={(e) => createProductInLeadFun(e)}
                          className="lead-cm-btn lead-save-btn"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* all leads save */}
                  {productDataScaleaton ? (
                    <DataShowScalaton />
                  ) : (
                    allProductsList.map((service, index) => (
                      <div className="save-lead-data" key={index}>
                        <div>
                          <p className="lead-heading">{service?.name}</p>
                          <h6 className="lead-sm-heading">
                            {service?.serviceName}
                          </h6>
                        </div>
                        {adminRole ? (
                          <div className="lead-heading">
                            <i
                              className="fa-solid fa-trash"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Product Delete"
                              onClick={(e) => deleteProductFun(e, service.id)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    ))
                  )}

                  {/* all leads save */}
                </div>
              </div>

              {/* Estimate*/}
              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn collapsed"
                    data-toggle="collapse"
                    data-target="#estimateCollapse"
                    aria-expanded="false"
                    aria-controls="estimateCollapse"
                  >
                    <h3 className="lead-heading lead-bold">Estimate</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="estimateCollapse"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <div className="all-center">
                      <Link to={"estimate"} className="create-btn">
                        Create New Estimate
                      </Link>
                      {/* <PopUpButton className="create-btn" name="Create New Estimate" /> */}
                    </div>
                    {/* <form>
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Select Product
                        </label>

                        <select
                          className="lead-cm-input"
                          name="select-product"
                          id="select-product"
                        >
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>
                      <div className="lead-btn-box">
                        <button className="lead-cm-btn lead-cancel-btn">
                          Cancel
                        </button>
                        <button
                          onClick={(e) => createProductInLeadFun(e)}
                          className="lead-cm-btn lead-save-btn"
                        >
                          Save
                        </button>
                      </div>
                    </form> */}
                  </div>
                  {/* all leads save */}

                  {/* Estimate Create API */}
                  <div className="save-lead-data">
                    <div>
                      <p className="lead-heading">BIS Registration</p>
                      <h6 className="lead-sm-heading">lead Estimate Create</h6>
                    </div>
                    <div className="lead-heading">
                      <button
                        onClick={() => openEstimateFun()}
                        className="create-btn padding-two mr-2"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {/* <PopUpButton   className="create-btn padding-two" name={<i className="fa-solid fa-eye"></i>} /> */}
                      {adminRole ? <i className="fa-solid fa-trash"></i> : ""}
                    </div>
                  </div>

                  {/* all leads save */}
                </div>
              </div>
              {/* end estimate */}

              {/* tasks */}

              {/* end  tasks */}

              {/* opportunities */}
              <div className="card mt-2">
                <div className="" id="headingThree">
                  <div
                    className="card-btn collapsed"
                    data-toggle="collapse"
                    data-target="#opportunitiesCollapse"
                    aria-expanded="false"
                    aria-controls="opportunitiesCollapse"
                  >
                    <h3 className="lead-heading lead-bold">Opportunities</h3>
                    <p className="lead-heading">
                      <i className="fa-solid fa-plus"></i>
                    </p>
                  </div>
                </div>
                <div
                  id="opportunitiesCollapse"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#accordion"
                >
                  <div className="my-card-content">
                    <form>
                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Status
                        </label>

                        <input className="lead-cm-input" type="text" />
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Contact
                        </label>
                        <input className="lead-cm-input" type="text" />
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          user
                        </label>

                        <select
                          className="lead-cm-input"
                          name="select-product"
                          id="select-product"
                        >
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="mercedes">Mercedes</option>
                          <option value="audi">Audi</option>
                        </select>
                      </div>

                      <div className="product-box">
                        <label
                          className="lead-heading"
                          htmlFor="select-product"
                        >
                          Notes
                        </label>
                        <textarea
                          className="lead-cm-input min-height-one"
                          type="text"
                        />
                      </div>

                      <div className="lead-btn-box">
                        <button
                          type="reset"
                          className="lead-cm-btn lead-cancel-btn"
                        >
                          Reset
                        </button>
                        <button className="lead-cm-btn lead-save-btn">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* all leads save */}
                  {allOportunities.map((data, index) => (
                    <div className="save-lead-data" key={index}>
                      <div>
                        <p className="lead-heading">BIS Registration</p>
                        <h6 className="lead-sm-heading mb-0">
                          {data?.description.split(0, 10)}...
                        </h6>
                        <h6 className="lead-sm-heading ">
                          {data?.estimateClose}
                        </h6>
                      </div>

                      <div className="lead-heading">
                        <i className="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  ))}

                  {/* all leads save */}
                </div>
              </div>

              {/* end  opportunities */}

              {/* contact */}

              {/* end  contact */}

              {/* nbew */}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {/* notes ui */}
          <div className="lead-filter-above">
            <div className="filter-box">
              <FilterButton
                name={"Notes"}
                icon={<i className="fa-regular  fa-note-sticky"></i>}
                data={notes}
                setData={setNotes}
              />
              {/* <PopUpButton  name={"SMS"}
                icon={<i className="fa-regular fa-message"></i>}
                className="filter-btn-design"
                data={sms}  /> */}
              {/* <FilterButton
                name={"SMS"}
                icon={<i className="fa-regular fa-message"></i>}
                data={sms}
                setData={setSms}
              /> */}
              {/* <PopUpButton   name={"Email"}
                icon={<i className="fa-regular fa-envelope"></i>}
                className="filter-btn-design"
                data={sms}  /> */}
              {/* <FilterButton
                name={"Email"}
                icon={<i className="fa-regular fa-envelope"></i>}
                data={email}
                setData={setEmail}
              /> */}
              <Link to={`history`} className="filter-btn-design">
                <i className="fa-regular mr-1 fa-clipboard"></i>History
              </Link>
              <Link
                to={`/erp/${userid}/sales/leads`}
                className="filter-btn-design"
              >
                <i className="fa-solid mr-1 fa-backward-step"></i>Back
              </Link>
            </div>
            <div className="filter-box mt-3">
              <select
                className="user-assign-tab"
                onChange={(e) => changeLeadAssignee(e.target.value)}
                name="user"
                id="user"
              >
                <option>Change Assignee</option>
                {userDataResponse.map((user, index) => (
                  <option key={index} value={user?.id}>
                    {user?.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div></div>
            {/* <FilterButton name={"note"} icon={<i className="fa-solid fa-note-sticky"></i>} data={notes1} setData={setNotes1}/> */}

            <div className={`notes-box mt-4 ${notes === true ? "d-none" : ""}`}>
              <div className="comment-icon">
                <div className="icon-box notes-cl">
                  <i className="fa-regular fa-note-sticky"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                {/* <div className="comment-above">
                  <h2 className="write-heading">Write a Notes</h2>
                </div> */}
                <textarea
                  className="text-area-box"
                  id="notes"
                  placeholder="write a notes ......"
                  name="message"
                  rows="4"
                  cols="50"
                  ref={NotesRef}
                  onChange={(e) => remarkMessageFunction(e)}
                ></textarea>
                <div className="comment-below">
                  <button
                    className="comment-btn"
                    onClick={(e) => createRemarkfun(e)}
                  >
                    {notesLoading ? "Loading" : "Submit"}
                  </button>
                </div>
              </div>
            </div>
            <div className={`notes-box mt-4 ${email === true ? "d-none" : ""}`}>
              <div className="comment-icon">
                <div className="icon-box email-cl">
                  <i className="fa-regular fa-envelope"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                <div className="comment-above">
                  <h2 className="write-heading">Write a Email</h2>
                </div>
                <textarea
                  className="text-area-box"
                  id="notes"
                  placeholder="write a notes ......"
                  name="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => remarkMessageFunction(e)}
                ></textarea>
                <div className="comment-below">
                  <button
                    className="comment-btn"
                    onClick={(e) => createRemarkfun(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className={`notes-box mt-4 ${sms === true ? "d-none" : ""}`}>
              <div className="comment-icon">
                <div className="icon-box sms-cl">
                  <i className="fa-regular cm-icon fa-comment"></i>
                </div>
                <div className="line"></div>
              </div>

              <div className="side-notes">
                <div className="comment-above">
                  <h2 className="write-heading">Write a SMS</h2>
                </div>
                <textarea
                  className="text-area-box"
                  id="notes"
                  placeholder="write a notes ......"
                  name="message"
                  rows="4"
                  cols="50"
                  onChange={(e) => remarkMessageFunction(e)}
                ></textarea>
                <div className="comment-below">
                  <button
                    className="comment-btn"
                    onClick={(e) => createRemarkfun(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* notes ui end */}

          {/* all notes data ui */}
          <div className="lead-set-data">
            {notesApiData.map((note, index) => (
              <div className="lead-filter-above" key={index}>
                {/* <FilterButton name={"note"} icon={<i className="fa-solid fa-note-sticky"></i>} data={notes1} setData={setNotes1}/> */}
                <div className={`notes-box mt-2`}>
                  <div className="comment-icon">
                    <div className="icon-box h-70">
                      <i className="fa-regular cm-icon fa-comment"></i>
                    </div>
                    <div className="line"></div>
                  </div>

                  <div className="side-notes">
                    <p className="mb-0 write-heading text-center pb-2">
                      <span className="mr-2">
                        {new Date(note?.latestUpdated).toDateString()}
                      </span>
                      <span className="mr-2">
                        {new Date(note?.latestUpdated).toLocaleTimeString(
                          "en-US"
                        )}
                      </span>
                    </p>
                    <div className="comment-above">
                      <div>
                        <h2 className="write-heading">Notes</h2>
                      </div>
                      <div className="d-flex">
                        <div className="circle-image">
                          {note?.updatedBy?.fullName.slice(0, 1)}
                        </div>
                        <span className="ml-1 write-heading">
                          {note?.updatedBy?.fullName}
                        </span>
                      </div>
                    </div>
                    <div className="text-display-box">
                      <pre>{note.message}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* all notes data ui ends */}
        </div>
      </div>
    </div>
  )
}

export default LeadDetailsPage
