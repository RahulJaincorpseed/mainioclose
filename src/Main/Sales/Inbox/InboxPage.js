import React, { useEffect, useState } from "react"
import "./InboxPage.scss"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import MUIDataTable from "mui-datatables"
import DataGridTables from "../../../components/DataGridTables"
import LeadsModule from "../Leads/LeadsModule"
import DataTableFirst from "../../../components/DataTableFirst"

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState(false)
  const [allLeadData, setAllLeadData] = useState([])

  useEffect(() => {
    getAllLead()
  }, [])

  const location = useLocation()
  const currentPath = location.pathname.split()
  const splitPath = currentPath[0].split("/")
  const currentUserId = Number(splitPath[2])

  console.log("id is ", currentUserId)

  console.log("all e")






  const leadColumns = [
    {
      name: "leadId",
      label: "ID",
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/${params.row.id}`}>{params.row.id} is</Link>
          </div>
        )
      },

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Name",

      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "comment",
      label: "Comment",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "count",
      label: "Count",
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: "name",
      label: "Edit",
      renderCell: (params) => {
        return (
          <div>
            <h1>{params.row.leadId}</h1>
          </div>
        )
      },
      options: {
        filter: true,
        sort: true,
      },
    },
  ]

  const filterOptions = {
    filterType: "checkbox",
  }

  const getAllLead = async () => {
    try {
      const allLead = await axios.get(
        `/leadService/api/v1/inbox/getAllInboxData?userId=${1}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )

      console.log("all Lead data", allLead.data)
      setAllLeadData(allLead.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="inbox-page cm-padding-one">
      <div className="inbox-top-btn">
        <button to="/sales" className={`tab-btn `}>
          Inbox
        </button>
        <button to="/sales2" className={`tab-btn `}>
          Done (25)
        </button>
        <button to="/sales3" className={`tab-btn `}>
          Failure (45)
        </button>
      </div>

      {/* <LeadsModule */}

      {/* <DataGridTables /> */}~

      <DataTableFirst
        tabletitle={"Inbox"}
        allleaddata={allLeadData}
        leadColumns={leadColumns}
        filterOptions={filterOptions}
      />

      {/* <div className="mt-5">
        <MUIDataTable
          title={"Inbox"}
          data={allLeadData}
          columns={leadColumns}
          options={filterOptions}
        />
      </div> */}

      {/* data table */}
      <div className="table-responsive mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Comment</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {allLeadData.map((lead, i) => (
              <tr key={i}>
                <td>{lead.leadId}</td>
                <td>
                  <Link to={`/erp/${currentUserId}/sales/${lead.leadId}`}>
                    {lead.name}
                  </Link>
                </td>
                <td>{lead.comment}</td>
                <td>
                  {lead.count === 0 ? (
                    lead.count
                  ) : (
                    <div className="lead-count">{lead.count}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InboxPage
