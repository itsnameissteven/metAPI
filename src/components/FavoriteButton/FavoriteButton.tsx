import React from 'react';
import { Api } from '../../apiCalls';
import { MdFavorite } from 'react-icons/md'
import './FavoriteButton.css'

type FavoriteButtonProps = {
  toggleFavorite: (ApiCard: Api) => void,
  apiData: Api,
  favorites: Api[],
}

export const FavoriteButton = ({toggleFavorite, apiData, favorites}: FavoriteButtonProps) => {
  const returnClassName = () => {
    const isFavorited = favorites.some(favorite => favorite.API === apiData.API)
    return isFavorited ? 'favorite-btn__heart--favorited' : 'favorite-btn__heart'
  }

  return (
    <button
      className="favorite-btn" 
      onClick={() => toggleFavorite(apiData)}
    >
      <MdFavorite className={returnClassName()}/>
    </button>
  )
}