import React, { useState } from "react"
import "./FilterButton.scss"

const FilterButton = ({ name, icon, data, setData }) => {
  const handleClick = () => {
    setData((prev) => !prev)
  }

  return (
    <button className="filter-btn-design" onClick={handleClick}>
      <span className="mr-2">{icon}</span>
      {name}
    </button>
  )
}

export default FilterButton
