import React from 'react';
import { AiFillDelete } from 'react-icons/ai'
import './Note.css'

type Note = {
  note: string
}

export const Note = ({note}: Note) => {
  return (
    <article className="note">
      <p className='note__details'> {note}</p>
      <button className='delete-btn'><AiFillDelete className='trash-icon'/></button>
    </article>
  )
}