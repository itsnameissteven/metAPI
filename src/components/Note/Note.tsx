import React from 'react';
import { AiFillDelete } from 'react-icons/ai'
import './Note.css'

type NoteProps = {
  note: string,
  apiName: string,
  deleteNote: (apiName: string, content: string) => void
}

export const Note = ({note, apiName, deleteNote}: NoteProps) => {
  return (
    <article className="note">
      <p className='note__details'> {note}</p>
      <button className='delete-btn' onClick={() => deleteNote(apiName, note)}><AiFillDelete className='trash-icon'/></button>
    </article>
  )
}