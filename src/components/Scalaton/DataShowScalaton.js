import React from "react"
import Skeleton from '@mui/material/Skeleton';

const DataShowScalaton = () => {
  return (
    <div className="scalaton-rectangle">
      <Skeleton variant="rectangular" width="100%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={30} />
      <Skeleton variant="rectangular" width="100%" height={30} /> 
    </div>
  )
}

export default DataShowScalaton
