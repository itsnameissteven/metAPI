import React, { Component } from "react";
import { Api } from "../../apiCalls";
import "./FeaturedCard.css";

type Props = Api & { addToFavorites: (ApiCard: Api) => void };

export class FeaturedCard extends Component<Props> {
  state: Api;
  constructor(props: Props) {
    super(props);
    this.state = {
      API: props.API!,
      Description: props.Description!,
      Auth: props.Auth!,
      HTTPS: props.HTTPS!,
      Cors: props.Cors!,
      Link: props.Link!,
      Category: props.Category!,
    };
  }

  render() {
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
        <button
          onClick={() =>
            this.state.API && this.props.addToFavorites(this.state)
          }
        >
          Add to Favorites
        </button>
      </div>
    );
  }
}
