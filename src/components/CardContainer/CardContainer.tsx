import React from 'react';
import {Api} from '../../apiCalls'
import {ApiCard} from '../ApiCard/ApiCard'
import './CardContainer.css'

type ApiProp = {
  apiList: Api[]
}
export const CardContainer = ({apiList}: ApiProp) => {

  const ApiCards = apiList.map((apiObj, index) => {
    return <ApiCard
    API={apiObj.API}
    Auth={apiObj.Auth}
    Category={apiObj.Category}
    Cors={apiObj.Cors}
    Description={apiObj.Description}
    HTTPS={apiObj.HTTPS}
    Link={apiObj.Link}
    key={index}
    />
  })

  return <div className={'card-container'}>{ApiCards}</div>;

}