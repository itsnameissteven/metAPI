import React from 'react'
import './SideBar.css'
import { HiArrowRight } from "react-icons/hi"
import { CardContainer } from '../CardContainer/CardContainer'
import {Api} from '../../apiCalls'

type ApiProp = {
  apiList: Api[]
  toggleFavorite: (ApiCard: Api) => void,
}

export const SideBar = ({apiList, toggleFavorite}:ApiProp) => {
  const toggleSideBar = () => {
    document.querySelector('.side-bar')?.classList.toggle('open');
    document.querySelector('.arrow')?.classList.toggle('open-arrow')
  }

  return (
    <div className='side-bar'>
      <HiArrowRight 
      className="arrow"
      onClick={toggleSideBar} />
      <h2 className="section-label">Saved Apis</h2>
      <CardContainer apiList={apiList} toggleFavorite={toggleFavorite} favorites={apiList} />
    </div>
  )

}