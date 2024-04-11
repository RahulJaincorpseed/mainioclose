import React, { useEffect } from "react"
import UserListComponent from "../../Tables/UserListComponent"
import { useDispatch, useSelector } from "react-redux"
import { getAllTickets } from "../../Toolkit/Slices/TicketSlice"
import TableScalaton from "../../components/TableScalaton"
import { getQueriesForElement } from "@testing-library/react"
import TableOutlet from "../../components/design/TableOutlet"

const AllTickets = () => {
  const currentUserId = useSelector((state) => state.auth.currentUser.id)

  const ticketsData = useSelector((state) => state.tickets.allTickets)
  const ticketsLoading = useSelector((state) => state.tickets.TicketsLoading)

  const ticketCount = ticketsData.length

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTickets(currentUserId))
  }, [])

  // const allMainUser = []
  const columns = [
    {
      field: "id",
      headerName: "S.No",
      width: 80,
      filterable: false,
      renderCell: (props) => {
        return (
          <p className="mb-0">
            {props.api.getRowIndexRelativeToVisibleRows(props?.row?.id) + 1}
          </p>
        )
      },
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 250,
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
  ]

  return (
    <TableOutlet>
      <h1 className="table-heading">All Tickets ({ticketCount})</h1>
      <div className="py-2">
        {ticketsLoading ? (
          <TableScalaton />
        ) : (
          <UserListComponent
            tableName={""}
            columns={columns}
            row={ticketsData}
          />
        )}
      </div>
    </TableOutlet>
  )
}

export default AllTickets
