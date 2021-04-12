import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getApis, Api } from './apiCalls'


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
    </div>
  );
}
}

export default App;
