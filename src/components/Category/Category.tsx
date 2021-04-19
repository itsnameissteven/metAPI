import React from 'react'
import './Category.css'

type categoryProps = {
  category: string;
  categoryLength: number;
  handleCatSelection(e:React.ChangeEvent<HTMLInputElement>):void; 
}

export const Category = ({category, categoryLength, handleCatSelection}:categoryProps) => {
  return (
    <div key={category} className="category">
      <input type="checkbox" id={category} name={category} onChange={e => handleCatSelection(e)} />
      <label htmlFor={category}>{category + `(${categoryLength})`}</label>
    </div>
  )
}
