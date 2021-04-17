import React from 'react'
import './SideBar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import { CardContainer } from '../CardContainer/CardContainer'
import {Api} from '../../apiCalls'

type ApiProp = {
  apiList: Api[]
  toggleFavorite: (ApiCard: Api) => void,
}

export const SideBar = ({apiList, toggleFavorite}:ApiProp) => {
  const toggleSideBar = () => {
    document.querySelector('.side-bar')?.classList.toggle('open');
    document.querySelector('.home-page')?.classList.toggle('shrink')
  }

  return (
    <div className='side-bar'>
      <GiHamburgerMenu 
      className="hamburger"
      onClick={toggleSideBar}></GiHamburgerMenu>
      <h2 className="section-label">Saved Apis</h2>
      <CardContainer apiList={apiList} toggleFavorite={toggleFavorite} favorites={apiList}></CardContainer>
    </div>
  )

}