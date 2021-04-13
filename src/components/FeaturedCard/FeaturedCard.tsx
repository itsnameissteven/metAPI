import { Api } from "../../apiCalls";
import "./FeaturedCard.css";

export const FeaturedCard = ({ details }: any) => {
  if (!details) {
    return null;
  }
  return (
    <div className="featured-card">
      <h2>{details.API}</h2>
      <p>Authentication: {details.Auth}</p>
      <p>Cors? {details.Cors}</p>
      <p>{details.HTTPS}</p>
      <p>Category: {details.Category}</p>
      <p>{details.Description}</p>
      <p>
        <a href={details.Link} target="_blank">
          more details
        </a>
      </p>
      <textarea className="featured-card__notes" placeholder="Notes"></textarea>
    </div>
  );
};
