import React from 'react'
import { useLoaderData } from 'react-router-dom'

const NoteDescription = () => {
  const note = useLoaderData();

  console.log(note)

  return (
    <div>NoteDescription</div>
  )
}

export default NoteDescription