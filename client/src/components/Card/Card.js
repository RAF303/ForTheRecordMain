import React from 'react'

export default function Card(props) {
  return (
  <div>
      <p>{props.name}</p>
      <p>{props.status}</p>
  </div>
  )
}
