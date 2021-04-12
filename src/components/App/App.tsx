import React from 'react';
import './App.css';
import { getApis, Api } from '../../apiCalls';
import {CardContainer} from '../CardContainer/CardContainer'
import {FeaturedCard} from '../FeaturedCard/FeaturedCard'
import {Route} from 'react-router-dom'
type Props = {}

class App extends React.Component<Props> {
  state : {
    apiList: Api[]
  };
  constructor(props: Props) {
    super(props)
    this.state = {
      apiList: []
    }
  }

  componentDidMount() {
    getApis()
    .then(data => this.setState({apiList: data.entries})) 
  }

  render() {
     console.log(this.state)
    return (
      <div className="App">
        <Route exact path='/' render={() => {
          return <CardContainer apiList={this.state.apiList}></CardContainer>
        }}/>
      <Route path='/:title' render={({match}) => {
        return <FeaturedCard Api={this.state.apiList.find(api => api.API === match.params.title)}/>
    }}/>
    </div>
  );
}
}

export default App;
