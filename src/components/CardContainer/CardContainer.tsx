import React from 'react';
import {Api} from '../../apiCalls'
import {ApiCard} from '../ApiCard/ApiCard'
import './CardContainer.css'

type ApiProp = {
  apiList: Api[],
  toggleFavorite: (ApiCard: Api) => void,
  favorites: Api[]
}
export const CardContainer = ({apiList, toggleFavorite, favorites}: ApiProp) => {

  const ApiCards = apiList.map((apiObj, index) => {
    return (
      <ApiCard
        apiData={apiObj}
        key={index}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    )
  })

  return <div className={'card-container'}>{ApiCards}</div>;

}