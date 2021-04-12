import {Api} from '../../apiCalls';

export const FeaturedCard = ({Api}:any) => {
  return (
  <div>
    <h2>{Api.API}</h2>
        <p>{Api.Auth}</p>
        <p>{Api.Cors}</p>
        <p>{Api.HTTPS}</p>
        <p>{Api.Category}</p>
        <p>{Api.Description}</p>
        <p>{Api.Link}</p>
        <textarea placeholder='Notes'></textarea>
  </div>
    )
}