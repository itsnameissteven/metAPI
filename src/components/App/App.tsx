import React from 'react';
import './App.css';
import { getApis, Api } from '../../apiCalls';
import {CardContainer} from '../CardContainer/CardContainer';
import {FeaturedCard} from '../FeaturedCard/FeaturedCard';
import {FilterForm} from '../FilterForm/FilterForm';
import { FilterState } from '../FilterForm/FilterForm';
import { Note } from '../Note/Note';
import { Route, Switch, Redirect } from 'react-router-dom';
import { SideBar } from '../SideBar/SideBar';
import { filterByCategory, filterByAuth, filterBySearch, filterByHTTPS, filterByCors } from '../../filterMethods'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'

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
    error: string;
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      apiList: [],
      currentApis: [],
      favorites: [],
      savedNotes: [],
      error: ''
    };
  }

  componentDidMount() {
    getApis()
    .then((data) => this.setState({ apiList: data.entries, currentApis: data.entries }))
    .catch(err => this.setState({ error: err.message }))
    const myFavorites = localStorage.getItem('favorites');
    const myNotes = localStorage.getItem('notes');
    myFavorites && this.setState({favorites: JSON.parse(myFavorites)});
    myNotes && this.setState({savedNotes: JSON.parse(myNotes)});
  }

  filter = (stateObj: FilterState): Api[] => {
    let matchedCards = this.state.apiList
    matchedCards = filterByCategory(matchedCards, stateObj)
    matchedCards = filterBySearch(matchedCards, stateObj)
    matchedCards = filterByAuth(matchedCards, stateObj)
    matchedCards = filterByHTTPS(matchedCards, stateObj)
    matchedCards = filterByCors(matchedCards, stateObj)
    this.setState({ currentApis: matchedCards })
    return matchedCards
  };

  toggleFavorite = (ApiCard: Api) => {
    const isSaved = this.state.favorites.some((element) => element.API === ApiCard.API);
    if(!isSaved){
      this.setState({ favorites: [...this.state.favorites, ApiCard] });
    } else {
      const updatedFavorites = this.state.favorites.filter(element => element.API !== ApiCard.API)
      this.setState({ favorites: updatedFavorites})
    }
    setTimeout(() => {
      !this.state.favorites.length && localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    },0)
  };

  saveNote = (ApiName: string, note: string) => {
    if(!note) return null;
    const hasSavedNotes = this.state.savedNotes.some(note => note.name === ApiName);
    console.log(hasSavedNotes)
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
    if (this.state.error) {
      return <ErrorMessage statusCode={this.state.error} />
    } else {
      return (
        <div className="App">
          <SideBar apiList={this.state.favorites} toggleFavorite={this.toggleFavorite}></SideBar>
          <Switch>
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
            )}}
          />
          <Route
            exact path="/api/:title"
            render={({ match }) => {
              console.log(match)
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
                        resetHome={() => this.setState({ currentList: this.state.apiList })}
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
          <Route render={() => <ErrorMessage statusCode={"404"}/>} />
          </Switch>
        </div>
      );
    }  
  }
}

export default App;
