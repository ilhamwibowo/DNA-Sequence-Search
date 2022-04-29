import React from 'react'

const ResultLabel = (data) => {
  return (
    <div className='resultLabel'>
      <p>{data.currentdate}</p>
      <p>{data.pred}</p>
    </div>
  )
}

export default ResultLabel