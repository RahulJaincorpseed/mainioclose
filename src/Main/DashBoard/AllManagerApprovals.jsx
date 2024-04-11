import React, { useEffect, useState } from "react"
import TableOutlet from "../../components/design/TableOutlet"
import UserListComponent from "../../Tables/UserListComponent"
import MainHeading from "../../components/design/MainHeading"
import TableCMPadding from "../../components/design/TableCMPadding"
import { allManagerUser, headHrUser } from "../../Toolkit/Slices/UsersSlice"
import { useDispatch, useSelector } from "react-redux"
import ColComp from "../../components/small/ColComp"
import ModelButton from "../../components/button/ModelButton"
import LoadingData from "../../components/usefulThings/LoadingData"
import TableScalaton from "../../components/TableScalaton"
import SomethingWrong from "../../components/usefulThings/SomethingWrong"
import { ApproveduserByManager } from "../../Toolkit/Slices/ApprovedStatus"

const AllManagerApprovals = () => {
  const dispatch = useDispatch()
  const currentUserId = useSelector((state) => state?.auth?.currentUser?.id)
  const [approverdUserDep, setApproverdUserDep] = useState(false)

  const {
    allManagerUsers: hrApprovalUser,
    userManagerLoading,
    userManagerError,
  } = useSelector((state) => state?.user)

  console.log(hrApprovalUser)

  useEffect(() => {
    dispatch(allManagerUser(currentUserId))
  }, [dispatch, approverdUserDep])

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 150,
      renderCell: (props) => {
        return <p className="mb-0">CORP00{props?.row?.id}</p>
      },
    },
    { field: "fullName", headerName: "Full Name", width: 150 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (props) => <ColComp data={props?.row?.email} />,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.designation} />,
    },
    {
      field: "department",
      headerName: "Department",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.department} />,
    },

    {
      field: "role",
      headerName: "Role",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.role} />,
    },
    {
      field: "aadharCard",
      headerName: "Aadhar card",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.aadharCard} />,
    },
    {
      field: "dateOfJoining",
      headerName: "Joining Date",
      width: 150,
      renderCell: (props) => (
        <p className="m-0">
          {props?.row?.dateOfJoining
            ? new Date(props?.row?.dateOfJoining)?.toLocaleDateString()
            : "NA"}
        </p>
      ),
    },
    {
      field: "employeeId",
      headerName: "Employee ID",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.employeeId} />,
    },
    {
      field: "epfNo",
      headerName: "Employee ID",
      width: 150,

      renderCell: (props) => <ColComp data={props?.row?.epfNo} />,
    },
    {
      field: "experience",
      headerName: "Experience",
      width: 180,
      renderCell: (props) => (
        <p className="m-0">
          {props?.row?.expInYear ? props?.row?.expInYear + " years" : "NA"} and{" "}
          {props?.row?.expInMonth ? props?.row?.expInMonth + " months" : "NA"}
        </p>
      ),
    },
    {
      field: "managers",
      headerName: "Manager",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.managers?.fullName} />,
    },
    {
      field: "panNumber",
      headerName: "pan Number",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.panNumber} />,
    },
    {
      field: "nationality",
      headerName: "Nationality",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.nationality} />,
    },
    {
      field: "permanentAddress",
      headerName: "Permanent Address",
      width: 250,
      renderCell: (props) => <ColComp data={props?.row?.permanentAddress} />,
    },
    {
      field: "residentialAddress",
      headerName: "Residential Address",
      width: 250,
      renderCell: (props) => <ColComp data={props?.row?.residentialAddress} />,
    },
    {
      field: "fatherName",
      headerName: "Father Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.fatherName} />,
    },
    {
      field: "fatherContactNo",
      headerName: "Father Contact No",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.fatherContactNo} />,
    },
    {
      field: "fatherOccupation",
      headerName: "Father Occupation",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.fatherOccupation} />,
    },
    {
      field: "motherName",
      headerName: "Mother Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.motherName} />,
    },
    {
      field: "motherContactNo",
      headerName: "Mother Contact No",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.motherContactNo} />,
    },
    {
      field: "motherOccupation",
      headerName: "Mother Occupation",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.motherOccupation} />,
    },
    {
      field: "spouseName",
      headerName: "Spouse Name",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.spouseName} />,
    },
    {
      field: "spouseContactNo",
      headerName: "Spouse Contact No",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.spouseContactNo} />,
    },
    {
      field: "language",
      headerName: "Language",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.language} />,
    },
    {
      field: "emergencyNumber",
      headerName: "Emergency Number",
      width: 150,
      renderCell: (props) => <ColComp data={props?.row?.emergencyNumber} />,
    },

    {
      field: "Action",
      headerName: "Action",
      width: 260,
      renderCell: (props) => {
        return (
          <>
            <button
              className="common-btn-one mr-2"
              onClick={() => approvedUserManagerFun(props.row.id)}
            >
              Approved
              <i className="fa-solid ml-2 fa-check"></i>
            </button>
            <button
              className="common-btn-one mr-2"
              onClick={() => rejectedUserManagerFun(props.row.id)}
            >
              Rejected
              <i className="fa-solid ml-2 fa-check"></i>
            </button>
          </>
        )
      },
    },
  ]

  const approvedUserManagerFun = (id) => {
    const userId = { ids: id }
    console.log("function call", currentUserId)
    if (window.confirm("Are you sure you want to Approved This User")) {
      const getApprovalManager = dispatch(
        ApproveduserByManager({ currid: currentUserId, userid: userId.ids })
      )
      setApproverdUserDep((prev) => !prev)
      console.log(getApprovalManager)
    }
  }

  const rejectedUserManagerFun = (id) => {
    const userId = { ids: id }
    console.log("function call", currentUserId)
    if (window.confirm("Are you sure you want to Rejected This User")) {
      const rejectedUsers = dispatch(
        ApproveduserByManager({ currid: currentUserId, userid: userId.ids })
      )
      setApproverdUserDep((prev) => !prev)
    }
  }

  return (
    <TableOutlet>
      <MainHeading data={`All users for Approvals`} />
      <TableCMPadding>
        {userManagerLoading && <TableScalaton />}
        {userManagerError && <SomethingWrong />}

        {hrApprovalUser && !userManagerLoading && !userManagerError && (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={hrApprovalUser}
          />
        )}
      </TableCMPadding>
    </TableOutlet>
  )
}

export default AllManagerApprovals
