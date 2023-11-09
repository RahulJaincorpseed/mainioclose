import React from "react"
import DataGridTables from "./DataGridTables"
import MUIDataTable from "mui-datatables"

const DataTableFirst = ({
  tabletitle,
  allleaddata,
  leadColumns,
  filterOptions,
}) => {
  return (
    <>
      <div className="mt-5">
        <MUIDataTable
          title={tabletitle}
          data={allleaddata}
          columns={leadColumns}
          options={filterOptions}
        />
      </div>
    </>
  )
}

export default DataTableFirst
