import React from 'react'
import './SideBar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import { CardContainer } from '../CardContainer/CardContainer'
import {Api} from '../../apiCalls'

const favorite: Api = {
  API: "Cat Facts",
  Auth: "",
  Category: "Animals",
  Cors: 'no',
  Description: 'Daily cat facts',
  HTTPS: true,
  Link: "https://alexwohlbruck.github.io/cat-facts/"
} 

export const SideBar = (props:{}) => {

  return (
    <div className='side-bar'>
      <GiHamburgerMenu 
      className="hamburger"
      onClick={() => document.querySelector('.side-bar')?.classList.toggle('open')}></GiHamburgerMenu>
      <h2>Favorites</h2>
      <CardContainer apiList={[favorite]}></CardContainer>
    </div>
  )

}