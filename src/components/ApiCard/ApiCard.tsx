import {Api} from '../../apiCalls'

export const ApiCard = ({API, Auth, Cors, HTTPS, Category, Description, Link}: Api) => {
  return (
    <article>
      <h2>{API}</h2>
      <p>{Auth}</p>
      <p>{Cors}</p>
      <p>{HTTPS}</p>
      <p>{Category}</p>
      <p>{Description}</p>
      <p>{Link}</p>
    </article>
    )
}