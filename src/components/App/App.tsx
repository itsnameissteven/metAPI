import React from 'react';
import './App.css';
import { getApis, Api } from '../../apiCalls';
import {CardContainer} from '../CardContainer/CardContainer';
import {FeaturedCard} from '../FeaturedCard/FeaturedCard';
import {FilterForm} from '../FilterForm/FilterForm';
import { FilterState } from '../FilterForm/FilterForm';
import { Note } from '../Note/Note';
import {Route} from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';

type Props = {};
type Notes = {
  name: string,
  notes: string[]
}

class App extends React.Component<Props> {
  state: {
    apiList: Api[];
    currentApis: Api[];
    favorites: Api[];
    savedNotes: Notes[]
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      apiList: [],
      currentApis: [],
      favorites: [],
      savedNotes: []
    };
  }

  componentDidMount() {
    getApis()
    .then((data) => this.setState({ apiList: data.entries, currentApis: data.entries }))
    .catch(err => console.log(err))
    const myFavorites = localStorage.getItem('favorites');
    const myNotes = localStorage.getItem('notes');
    myFavorites && this.setState({favorites: JSON.parse(myFavorites)});
    myNotes && this.setState({savedNotes: JSON.parse(myNotes)});
  }

  filterByCategory = (matchedCards: Api[], stateObj: FilterState) => {
    if (stateObj.Categories.length) {
      return matchedCards.filter(api => stateObj.Categories.includes(api.Category))
    } else {
      return matchedCards
    }
  }

  filterBySearch = (matchedCards: Api[], stateObj: FilterState) => {
    if (stateObj.search.length) {
      return matchedCards.filter(api => api.API.toLowerCase().includes(stateObj.search.toLowerCase()))
    } else {
      return matchedCards
    }
  }

  filterByAuth = (matchedCards: Api[], stateObj: FilterState) => {
    if (stateObj.Auth !== 'all') {
      return matchedCards.filter(api => api.Auth === stateObj.Auth)
    } else {
      return matchedCards
    }
  }

  filterByHTTPS = (matchedCards: Api[], stateObj: FilterState) => {
    if (stateObj.HTTPS !== 'all') {
      return matchedCards.filter(api => stateObj.HTTPS === 'true' ? api.HTTPS === true : api.HTTPS === false)
    } else {
      return matchedCards
    }
  }

  filterByCors = (matchedCards: Api[], stateObj: FilterState) => {
    if (stateObj.Cors !== 'all') {
      return matchedCards.filter(api => api.Cors === stateObj.Cors)
    } else {
      return matchedCards
    }
  }

  filter = (stateObj: FilterState): Api[] => {
    let matchedCards = this.state.apiList
    matchedCards = this.filterByCategory(matchedCards, stateObj)
    matchedCards = this.filterBySearch(matchedCards, stateObj)
    matchedCards = this.filterByAuth(matchedCards, stateObj)
    matchedCards = this.filterByHTTPS(matchedCards, stateObj)
    matchedCards = this.filterByCors(matchedCards, stateObj)
    this.setState({ currentApis: matchedCards })
    return matchedCards
  };

  toggleFavorite = (ApiCard: Api) => {
    const alreadySaved = this.state.favorites.some((element) => element.API === ApiCard.API);
    if(!alreadySaved){
      this.setState({ favorites: [...this.state.favorites, ApiCard] });
    } else {
      const updatedFavorites = this.state.favorites.filter(element => element.API !== ApiCard.API)
      this.setState({ favorites: updatedFavorites})
    }
  };

  saveNote = (ApiName: string, note: string) => {
    if(!note) return null;
    const hasSavedNotes = this.state.savedNotes.some(note => note.name === ApiName);
    if(hasSavedNotes) {
      const updatedNotes = this.state.savedNotes.map( savedNote => {
        if(savedNote.name === ApiName) {
          savedNote.notes.unshift(note);
        }
        return savedNote;
      });
      return this.setState({ savedNotes: updatedNotes});
    } 
    this.setState({ savedNotes: [...this.state.savedNotes, {name: ApiName, notes: [note]}]});
  }

  deleteNote = (apiName: string, content: string) => {
    const myNote = this.state.savedNotes.find(note => note.name === apiName)
    const unEditedNotes = this.state.savedNotes.filter(note => note !== myNote)
    myNote?.notes.splice(myNote.notes.indexOf(content), 1)
    this.setState({ savedNotes: [...unEditedNotes, myNote]})
  }

  render() {
    this.state.favorites.length && localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    this.state.savedNotes.length && localStorage.setItem('notes', JSON.stringify(this.state.savedNotes));
    return (
      <div className="App">
        <SideBar></SideBar>
        <Route exact path='/' render={() => {
          return (
            <main>
              <h1>metAPI</h1>
              <FilterForm filter={this.filter} apiList={this.state.apiList}/>
              <CardContainer 
                apiList={this.state.currentApis} 
                toggleFavorite={this.toggleFavorite} 
                favorites={this.state.favorites}
              />
            </main>
          )
        }}/>
        <Route
          path="/:title"
          render={({ match }) => {
            const data = this.state.apiList.find((api) => api.API === match.params.title);
            if (data) {
              const myNotes = this.state.savedNotes.find(savedNote => savedNote.name === data.API)
              const savedNotes = myNotes?.notes.map((note, index) => {
                return <Note note={note} key={index} apiName={myNotes.name} deleteNote={this.deleteNote} />
              })
              return (
                <main>
                  <FeaturedCard 
                    {...data} 
                    toggleFavorite={this.toggleFavorite} 
                    saveNote={this.saveNote} 
                    favorites={this.state.favorites} 
                  />
                  <section className='saved-notes'>
                    <h3>Notes</h3>
                    {savedNotes}
                  </section>
                </main>
              );
            }
          }}
        />
      </div>
    );
  }
}

export default App;
