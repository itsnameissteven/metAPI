import {Api} from '../../apiCalls';
import { Link as CardLink } from 'react-router-dom'
import { FavoriteButton } from '../FavoriteButton/FavoriteButton';
import './ApiCard.css'

type ApiCardProps = {
  apiData: Api,
  toggleFavorite: (ApiCard: Api) => void,
  favorites: Api[]
}

export const ApiCard = ({apiData, toggleFavorite, favorites}: ApiCardProps) => {
  const { API, Auth, Cors, HTTPS, Category, Description, Link } = apiData;
  return (
    <div className="api-card">
      <div className="favorite-btn-api-card">
        <FavoriteButton 
          toggleFavorite={toggleFavorite} 
          apiData={apiData} 
          favorites={favorites}
        />
      </div>
      <CardLink to={'/' + API} className="api-card-link">
        <article>
          <p className="category">{Category}</p>
          <h2>{API}</h2>
          <p>{Description}</p>
          <p><strong>Auth:</strong> {Auth.length ? Auth : 'No'}</p>
          <p><strong>Cors:</strong> {Cors}</p>
          <p><strong>HTTPS:</strong> {HTTPS ? 'yes' : 'no'}</p>
          <p>{Link}</p>
        </article>
      </CardLink>
    </div>
  )
}