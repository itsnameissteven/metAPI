import React from 'react';
import './App.css';
import { getApis, Api } from '../../apiCalls';
import {CardContainer} from '../CardContainer/CardContainer'
import {FeaturedCard} from '../FeaturedCard/FeaturedCard'
import {FilterForm} from '../FilterForm/FilterForm'
import { FilterState } from '../FilterForm/FilterForm'
import {Route} from 'react-router-dom'
import { getEnabledCategories } from 'node:trace_events';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
type Props = {}

class App extends React.Component<Props> {
  state : {
    apiList: Api[]
    currentApis: Api[]

  };
  constructor(props: Props) {
    super(props)
    this.state = {
      apiList: [],
      currentApis: [],
    }
  }

  componentDidMount() {
    getApis()
    .then(data => this.setState({apiList: data.entries, currentApis: data.entries})) 
  }

  filter = (stateObj: FilterState):Api[] => {
    let matchingCards: Api[] = [];
      matchingCards = this.state.apiList.filter(api => {
      return api.API.toLowerCase().includes(stateObj.search.toLowerCase()) 
      // || api.Description.toLowerCase().includes(stateObj.search.toLowerCase())
    })
      stateObj.Categories && (
        matchingCards = matchingCards.filter(api => {
          return api.Category === stateObj.Categories
        }))
      
      stateObj.Auth !== 'Empty' && (
        matchingCards = matchingCards.filter(api => {
          return api.Auth.toLowerCase() === stateObj.Auth.toLowerCase();
        })
      )

      stateObj.HTTPS !== '' && (
        matchingCards = matchingCards.filter(api => {
          return api.HTTPS === stateObj.HTTPS;
        })
      )

      stateObj.Cors !== '' && (
        matchingCards = matchingCards.filter(api => {
          return api.Cors.toLowerCase() === stateObj.Cors.toLowerCase();
        })
      )

    console.log(matchingCards)
    if (matchingCards.length) {
      this.setState({...this.state, currentApis: matchingCards})
      return matchingCards
    } else return this.state.apiList
  }

  render() {
    return (
      <div className="App">
        <h1>metAPI</h1>
        <FilterForm filter={this.filter} apiList={this.state.apiList}/>
        <Route exact path='/' render={() => {
          return <CardContainer apiList={this.state.currentApis}></CardContainer>
        }}/>
      <Route path='/:title' render={({match}) => {
        return <FeaturedCard Api={this.state.apiList.find(api => api.API === match.params.title)}/>
    }}/>
    </div>
  );
}
}

export default App;
