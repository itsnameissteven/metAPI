import React from 'react';

type Note = {
  note: string
}

export const Note = ({note}: Note) => {
  return (
    <p> {note}</p>
  )
}