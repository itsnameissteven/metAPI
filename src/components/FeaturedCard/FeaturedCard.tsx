import React, { Component } from "react";
import { Api } from "../../apiCalls";
import "./FeaturedCard.css";

type Props = {
  API?: string;
  Description?: string;
  Auth?: string;
  HTTPS?: boolean;
  Cors?: string;
  Link?: string;
  Category?: string;
  addToFavorites: (ApiCard: Api) => void;
};

export class FeaturedCard extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.API) {
      return null;
    }
    return (
      <div className="featured-card">
        <h2>{this.props.API}</h2>
        <p>Authentication: {this.props.Auth}</p>
        <p>Cors? {this.props.Cors}</p>
        <p>{this.props.HTTPS}</p>
        <p>Category: {this.props.Category}</p>
        <p>{this.props.Description}</p>
        <p>
          <a href={this.props.Link} target="_blank">
            more details
          </a>
        </p>
        <textarea
          className="featured-card__notes"
          placeholder="Notes"
        ></textarea>
        <button>Add to Favorites</button>
      </div>
    );
  }
}
