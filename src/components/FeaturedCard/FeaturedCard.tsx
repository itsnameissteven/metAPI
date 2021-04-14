import React, { Component } from "react";
import { Api } from "../../apiCalls";
import { Link as HomeLink } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
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
    const {API, Auth, Cors, HTTPS, Category, Description, Link} = this.props
    return (
      <div className="featured-card">
        <HomeLink to='/' className='home-link'><BiArrowBack className="home-link__arrow" />View all apis</HomeLink>
        <h2>{API}</h2>
        <p>{Description}</p>
        <p><strong>Authentication:</strong> {Auth.length ? Auth : 'no'}</p>
        <p><strong>Cors:</strong> {Cors}</p>
        <p><strong>Https:</strong>{HTTPS}</p>
        <p><strong>Category:</strong> {Category}</p>
        <button>
          <a href={Link} target="_blank">
            more details
          </a>
        </button>
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
