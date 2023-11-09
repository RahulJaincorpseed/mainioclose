import React, { useEffect, useState } from "react"
import "./LeadsModule.scss"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import AllLeadsDisplay from "./AllLeadsDisplay"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import DataTableFirst from "../../../components/DataTableFirst"
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid"
import DataGridNewTable from "../../../components/DataGridNewTable"
import UserLeadComponent from "../../../Tables/UserLeadComponent"
import LeadCreateModel from "../../../Model/LeadCreateModel"
import { useSelector } from "react-redux"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import TableScalaton from "../../../components/TableScalaton"

const LeadsModule = () => {
  const [activeTab, setActiveTab] = useState(false)
  const [allLeadData, setAllLeadData] = useState([])
  const [leadUserNew, setLeadUserNew] = useState([])
  const [updateActive, setUpdateActive] = useState(false)
  const [leadScalatonCall, setLeadScalatonCall] = useState(true)

  useEffect(() => {
    getAllLead()
  }, [updateActive])

  useEffect(() => {
    getAllLeadUser()
  }, [])

  const location = useLocation()
  const currentPath = location.pathname.split()
  const splitPath = currentPath[0].split("/")
  const currentUserId = Number(splitPath[2])
  const currentLeadId = Number(splitPath[4])
  // console.log("current path id  is", splitPath );

  // console.log("id is ", currentUserId)

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "leadName",
      headerName: "Name",
      width: 150,
      renderCell: (props) => {
        return (
          <Link to={`/erp/${currentUserId}/sales/${props.row.id}`}>
            {props?.row?.leadName}
          </Link>
        )
      },
    },
    {
      field: "assigneeName",
      headerName: "Assignee",
      width: 150,
      renderCell: (props) => {
        return <p className="mb-0">{props?.row?.assignee?.fullName}</p>
      },
    },
    { field: "mobileNo", headerName: "Mobile No", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    {
      field: "createDate",
      headerName: "Date",
      width: 150,
      renderCell: (props) => {
        let date = new Date(props.row.createDate)
        let dateNew = date.toLocaleDateString()
        console.log("date is ", date.toLocaleDateString())
        return <p className="mb-0">{dateNew.toString()}</p>
      },
    },
    {
      field: "assignee",
      headerName: "Assignee",
      width: 170,
      renderCell: (props) => {
        return (
          <select
            className="assignee-button"
            onChange={(e) => changeLeadAssignee(e.target.value, props.row.id)}
            // onSelect={(e)=> }
            name="lead"
            id="lead"
          >
            {leadUserNew.map((user, index) => (
              <option key={index} value={user.id}>
                {user?.fullName}
              </option>
            ))}
          </select>
        )
      },
    },
    {
      field: "leadDescription",
      headerName: "lead Description",
      width: 200,
      renderCell: (props) => {
        ;<p className="mb-0">{props?.row?.leadDescription.slice(0, 2)}</p>
      },
    },
    { field: "source", headerName: "Source", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (props) => {
        return (
          <p onClick={() => leadDeleteResponse(props.row.id)}>
            <i class="fa-solid fa-trash"></i>
          </p>
        )
      },
    },
  ]

  const getUserId = (id) => {
    console.log("id is ", id)
  }

  const changeUserAssignee = (user) => {
    console.log("user is selectd", user)
  }

  const leadDeleteResponse = async (id) => {
    // confirm("Are you sure ?")
    try {
      const leadResponse = await axios.delete(
        `/leadService/api/v1/lead/deleteLead?leadId=${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      console.log("delete", leadResponse)
    } catch (err) {
      console.log("err", err)
    }
  }

  const changeLeadAssignee = async (id, leadId) => {
    console.log("id is call ssss", id)
    console.log("current lead D", leadId)

    try {
      const updatePerson = await axios.put(
        `/leadService/api/v1/lead/updateAssignee?leadId=${leadId}&userId=${id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      console.log("updateLeadAssignee is", updatePerson)
      setUpdateActive((prev) => !prev)
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Something Went Wrong")
      }

      console.log(err)
    }
  }

  const getAllLeadUser = async () => {
    try {
      const allLeadUser = await axios.get(
        `/leadService/api/v1/users/getAllUser`
      )
      setLeadUserNew(allLeadUser.data)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllLead = async () => {
    try {
      const allLead = await axios.get(
        `/leadService/api/v1/lead/getAllLead?userId=${currentUserId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      setAllLeadData(allLead.data)
      setLeadScalatonCall(false)
    } catch (err) {
      console.log(err)
      setLeadScalatonCall(true)
    }
  }

  console.log("i am all lead data", allLeadData)

  return (
    <div className="lead-module small-box-padding">
      <div className="create-user-box">
        <LeadCreateModel />
      </div>
      {leadScalatonCall ? (
        <TableScalaton />
      ) : (
        <UserLeadComponent
          tableName={"leads"}
          columns={columns}
          row={allLeadData}
        />
      )}
    </div>
  )
}

export default LeadsModule

{
  /* <div className="inbox-top-btn">
        <button to="/sales" className={`tab-btn `}>
          Inbox
        </button>
        <button to="/sales2" className={`tab-btn `}>
          Done (25)
        </button>
        <button to="/sales3" className={`tab-btn `}>
          Failure (454545)
        </button>
      </div> */
}

{
  /* {<DataTableFirst tabletitle={"Leads"} allleaddata = {fakeRow} leadColumns= {fakecolumn} />} */
}
{
  /* <LeadCreateModel /> */
}

{
  /* <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Mobile Numberfff</th>
              <th scope="col">Email</th>
              <th scope="col">Assignee</th>
              <th scope="col">update Assignee</th>
              <th scope="col">Description</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {allLeadData.map((lead, i) => (
              <tr key={i}>
                <td>{lead.id}</td>
                <td>
                  <Link to={`/erp/${currentUserId}/sales/${lead.id}`}>
                    {lead.name}
                  </Link>
                </td>
                <td>{lead.mobileNo}</td>
                <td>{lead.email}</td>
                <td>{lead.assignee.fullName}</td>
                <td>
                  <select className="assignee-button" onChange={(id)=> changeLeadAssignee(lead.id)} name="cars" id="cars">
                    {leadUserNew.map((user, index) => (
                        <option key={index} value={user.fullName} >{user.fullName}</option>
                      
                    ))}
                  </select>
                  
                </td>
                <td>{lead.assignee.email}</td>
                <td>{lead.leadDescription}</td>
                <td>{lead.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */
}

// const columns = [
//   {
//     name: "id",
//     label: "ID",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "name",
//     label: "Name",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "mobileNo",
//     label: "Mobile",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "email",
//     label: "Email",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "createDate",
//     label: "create Date",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "leadDescription",
//     label: "Description",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
//   {
//     name: "source",
//     label: "Source",
//     options: {
//       filter: true,
//       sort: true,
//     },
//   },
// ]
