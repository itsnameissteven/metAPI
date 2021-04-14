import React from 'react';
import './Note.css'

type Note = {
  note: string
}

export const Note = ({note}: Note) => {
  return (
    <article className="note">
      <p className='note__details'> {note}</p>
    </article>
  )
}