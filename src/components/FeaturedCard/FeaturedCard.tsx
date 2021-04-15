import React, { Component } from "react";
import { Api } from "../../apiCalls";
import { FavoriteButton } from '../FavoriteButton/FavoriteButton'
import { Link as HomeLink } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md'
import "./FeaturedCard.css";

type Props = Api & { 
  toggleFavorite: (ApiCard: Api) => void, 
  saveNote: (ApiName: string, note: string) => void, 
  favorites: Api[]
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

  returnClassName = () => {
    const isFavorited = this.props.favorites.some(favorite => favorite.API === this.state.API)
    return isFavorited ? 'favorite-btn__heart--favorited' : 'favorite-btn__heart'
  }

  handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({note: event.target.value})
  }

  saveCurrentNote = () => {
    this.props.saveNote(this.state.API, this.state.note);
    this.setState({note: ''});
  }

  render() {
    const {API, Auth, Cors, HTTPS, Category, Description, Link, favorites} = this.props
    const { note, ...originalApiData} = this.state
    return (
      <div className="featured-card">
        <HomeLink to='/' className='home-link'>
          <BiArrowBack className="home-link__arrow" />View all apis
        </HomeLink>
        <div className="favorite-btn-container">
          <FavoriteButton 
            toggleFavorite={this.props.toggleFavorite} 
            apiData={originalApiData} 
            favorites={favorites}
          />
        </div>
        <h2 className="featured-card__header">{API}</h2>
        <p>{Description}</p>
        <p><strong>Authentication:</strong> {Auth.length ? Auth : 'no'}</p>
        <p><strong>Cors:</strong> {Cors}</p>
        <p><strong>Https:</strong>{HTTPS}</p>
        <p><strong>Category:</strong> {Category}</p>
        <button className="featured-card__btn">
          <a href={Link} target="_blank" className="external-link">
            Visit Website
          </a>
        </button>
        <textarea
          name='note'
          value={this.state.note}
          className="featured-card__notes"
          placeholder="Notes"
          onChange={this.handleChange}
        />
        <button onClick={this.saveCurrentNote} className="featured-card__btn save-note__btn">Save Note</button>
      </div>
    );
  }
}
