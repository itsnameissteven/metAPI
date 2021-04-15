import React from 'react'
import './SideBar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import { CardContainer } from '../CardContainer/CardContainer'
import {Api} from '../../apiCalls'

type ApiProp = {
  apiList: Api[]
  toggleFavorite: (ApiCard: Api) => void,
  favorites: Api[]
}

export const SideBar = ({apiList, toggleFavorite, favorites}:ApiProp) => {

  return (
    <div className='side-bar'>
      <GiHamburgerMenu 
      className="hamburger"
      onClick={() => document.querySelector('.side-bar')?.classList.toggle('open')}></GiHamburgerMenu>
      <h2 className="section-label">Saved Apis</h2>
      <CardContainer apiList={apiList} toggleFavorite={toggleFavorite} favorites={favorites}></CardContainer>
    </div>
  )

}