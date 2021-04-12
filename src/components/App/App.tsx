import React from 'react';
import './App.css';
import { getApis, Api } from '../../apiCalls';
import {CardContainer} from '../CardContainer/CardContainer'

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
        <CardContainer apiList={this.state.apiList}></CardContainer>
    </div>
  );
}
}

export default App;
