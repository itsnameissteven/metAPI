import React, { Component } from "react";
import { Api } from "../../apiCalls";
import "./FeaturedCard.css";

type Props = Api & { 
  addToFavorites: (ApiCard: Api) => void, 
  saveNote: (ApiName: string, note: string) => void 
};

export class FeaturedCard extends Component<Props> {
  state: Api & {note: string};
  constructor(props: Props) {
    super(props);
    this.state = {
      API: props.API,
      Description: props.Description,
      Auth: props.Auth,
      HTTPS: props.HTTPS,
      Cors: props.Cors,
      Link: props.Link,
      Category: props.Category,
      note: ''
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({note: event.target.value})
  }

  saveCurrentNote = () => {
    this.props.saveNote(this.state.API, this.state.note);
    this.setState({note: ''});
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
          name='note'
          value={this.state.note}
          className="featured-card__notes"
          placeholder="Notes"
          onChange={this.handleChange}
        />
        <button onClick={this.saveCurrentNote}>Save Notes</button>
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
