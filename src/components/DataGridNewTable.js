import React from "react"
import { DataGrid } from "@mui/x-data-grid"

const DataGridNewTable = () => {
  const rows = [
    { id: 1, col1: "Hello", name: "World", email: "rahul@gmail.com" },
    {
      id: 2,
      col1: "DataGridPro",
      name: "is Awesome",
      email: "rahul@gmail.com",
    },
    { id: 3, col1: "MUI", name: "is Amazing", email: "rahul@gmail.com" },
    { id: 4, col1: "MUI", name: "is Amazing", email: "rahul@gmail.com" },
    { id: 5, col1: "MUI", name: "is Amazing", email: "rahul@gmail.com" },
  ]

  const columns = [
    { field: "id", headerName: "lead ID", width: 150 },
    { field: "name", headerName: "Lead Name", width: 150 },
    { field: "email", headerName: "Email ID", width: 150 },
  ]

  return (
    <div>
      <h1>Table</h1>
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default DataGridNewTable
