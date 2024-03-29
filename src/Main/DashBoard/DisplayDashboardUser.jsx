import axios from "axios"
import React, { useEffect, useState } from "react"
import UserListComponent from "../../Tables/UserListComponent"
import { Link } from "react-router-dom"
import CreateuserDashboard from "../../Model/CreateuserDashboard"
import { deleteQuery } from "../../API/DeleteQuery"

const DisplayDashboardUser = () => {
  const [displayAlluser, setDisplayAllUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [userSuspand, setUserSuspand] = useState(false);

  useEffect(() => {
    displayUser()
  }, [userSuspand])

  
  const displayUser = async () => {
    try {
      const userData = await axios.get(`/leadService/api/v1/users/getAllUser`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      setDisplayAllUser(userData.data)
      setLoading(false)
    } catch (err) {}
  }

  // /leadService/api/v1/users/deleteUser?id=10

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to deActivate this User?") == true) {
      try {
        const suspandUser = await deleteQuery(`/securityService/api/auth/deleteUser?userId=${id}`)
        const deleteUser = await deleteQuery(
          `/leadService/api/v1/users/deleteUser?id=${id}`
        )
          console.log(suspandUser);
          console.log(deleteUser);
          setUserSuspand((prev) => !(prev))
        // window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      renderCell: (props) => {
        return <p className="mb-0">CORP00{props.row.id}</p>
      },
    },
    { field: "fullName", headerName: "Full Name", width: 150 },
    { field: "email", headerName: "Email", width: 240, hideable: false },
    { field: "designation", headerName: "Designation", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (props) => {
        return (
          <button
            className="btn btn-info"
            onClick={() => deleteUser(props.row.id)}
          >
            Suspand
          </button>
        )
      },
    },
  ]

  return (
    <div className="small-box-padding">
      <div className="create-user-box">
        <h1 className="table-heading">User List</h1>
        
        <CreateuserDashboard />
        {/* <button className="create-user-btn"><i className="fa-solid mr-1 fa-circle-plus"></i></button> */}
      </div>

      <UserListComponent
        tableName={""}
        columns={columns}
        row={displayAlluser}
      />

      {/* <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">first Name</th>
              <th scope="col">last Name</th>
              <th scope="col">Name</th>
              <th scope="col">Designation</th>
              <th scope="col">Email</th>
              <th scope="col">Department</th>
            </tr>
          </thead>
          {loading ? (
            <div>Loading</div>
          ) : (
            <tbody>
              {displayAlluser.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.fullName}</td>
                  <td>{user.designation}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div> */}
    </div>
  )
}

export default DisplayDashboardUser
