import React from 'react'
import './SideBar.css'
import { GiHamburgerMenu } from "react-icons/gi"
import { CardContainer } from '../CardContainer/CardContainer'
import {Api} from '../../apiCalls'

const savedApi: Api = {
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
      <h2 className="section-label">Saved Apis</h2>
      <CardContainer apiList={[savedApi, savedApi]}></CardContainer>
    </div>
  )

}