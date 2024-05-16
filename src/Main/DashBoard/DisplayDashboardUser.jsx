import React, { useEffect, useState } from "react"
import UserListComponent from "../../Tables/UserListComponent"
import { Link } from "react-router-dom"
import CreateuserDashboard from "../../Model/CreateuserDashboard"
import { deleteQuery } from "../../API/DeleteQuery"
import { allActiveUserFun, getAllUsers } from "../../Toolkit/Slices/UsersSlice"
import { useDispatch, useSelector } from "react-redux"
import TableScalaton from "../../components/TableScalaton"
import MainHeading from "../../components/design/MainHeading"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { allUserdataCol } from "../../data/Userdata"

const DisplayDashboardUser = () => {
  const [userSuspand, setUserSuspand] = useState(false)
  const [getId, setGetId] = useState("")
  const [userToggle, setUserToggle] = useState(false)
  const [editType, setEditType] = useState(false)
  const dispatch = useDispatch()

  const {
    allUsers: allMainUser,
    userLoading,
    userError,
  } = useSelector((prev) => prev.user)

  const userCount = allMainUser.length

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, userSuspand])

  console.log("Main Users", allMainUser);

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure to deActivate this User?") == true) {
      try {
        const suspandUser = await deleteQuery(
          `/securityService/api/auth/deleteUser?userId=${id}`
        )
        const deleteUser = await deleteQuery(
          `/leadService/api/v1/users/deleteUser?id=${id}`
        )
        setUserSuspand((prev) => !prev)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const myNewId = (id) => {
    setGetId(id)
    setEditType(true)
  }

  const presentUserFun = async (id) => {
    const activeRowData = {
      id: id,
      currentUserId: 2
    }
     if (window.confirm( "Do you really want to Not Assign Any Lead To User?")) {
      console.log("api calll before");
      const toggleData = await dispatch(allActiveUserFun(activeRowData)) 
      console.log(toggleData);
      setUserToggle((prev) => !prev)
    }
  }

  const columns = [
    ...allUserdataCol,
    {
      field: "autoActive",
      headerName: "Present",
      width: 180,
      renderCell: (props) => {
        return (
          <>
            <button
              onClick={() => presentUserFun(props.row.id)}
              className={`btn ${props?.row?.autoActive ? "btn-success" : "btn-danger"}`}
            >
              {props?.row?.autoActive ? "Present" : "Absent"}
            </button>
          </>
        )
      },
    },

    {
      field: "Action",
      headerName: "Action",
      width: 180,
      renderCell: (props) => {
        return (
          <>
            <button
              className="common-btn-one mr-2"
              data-toggle="modal"
              data-target="#createuserdashboard"
              onClick={() => myNewId(props?.row)}
            >
              Edit
            </button>
            <button
              className="common-btn-one"
              onClick={() => deleteUser(props?.row?.id)}
            >
              Suspand
            </button>
          </>
        )
      },
    },
  ]

  return (
    <>
      <div className="create-user-box">
        <MainHeading data={`User List (${userCount})`} />
        <div className="all-center">
          <Link to={`deactivateuser`} className="common-btn-one mr-2">
            Deactivate Users
          </Link>
          <CreateuserDashboard data={getId} type={editType} />
        </div>
      </div>
      {userLoading && <TableScalaton />}
      {userError && <SomethingWrong />}
      {allMainUser && !userLoading && !userError && (
        <UserListComponent tableName={""} columns={columns} row={allMainUser} />
      )}
    </>
  )
}

export default DisplayDashboardUser
