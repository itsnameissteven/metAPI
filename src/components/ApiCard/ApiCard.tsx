import {Api} from '../../apiCalls';
import {Link} from 'react-router-dom'
import './ApiCard.css'
/**
 * Representing a router link because the destructured Link prop was reassigning the value of Link
 */
const CardLink = Link
export const ApiCard = ({API, Auth, Cors, HTTPS, Category, Description, Link}: Api) => {
  return (
    <CardLink to={'/' + API} className="api-card">
      <article>
        <p className="category">{Category}</p>
        <h2>{API}</h2>
        <p>{Description}</p>
        <p>{Auth + ' Auth'}</p>
        <p>{Cors + ' Cors'}</p>
        <p>{HTTPS}</p>
        <p>{Link}</p>
      </article>
    </CardLink>
    )
}