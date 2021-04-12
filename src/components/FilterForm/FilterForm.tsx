import React from 'react'
import {Api} from '../../apiCalls'

export interface FilterState {
  search: string;
      Categories: string;
      Auth: string;
      HTTPS: boolean | string;
      Cors: string;
  }

type FilterProps = {
  filter: any
}

export class FilterForm extends React.Component<FilterProps> {
  state: FilterState
  constructor(props: FilterProps) {
    super(props)
    this.state = {
      search: '',
      Categories: '',
      Auth: 'Empty',
      HTTPS: '',
      Cors: '',
    }
  }

  handleChange = (e: any):void => {
    this.setState({...this.state, [e.target.name]: e.target.value}, () => {
      return this.props.filter(this.state)
    })
  }

  render() {
    return (
      <form
      onChange={this.handleChange}
      onSubmit={(e) => e.preventDefault()}>
        <input name="search" placeholder="Search"></input>
        <select name="Categories">
          <option>All Categories</option>
          <option>Animals</option>
          <option>Anime</option>
          <option>Anti Malware</option>
          <option>Art & Design</option>
          <option>Books</option>
          <option>Business</option>
          <option>Calendar</option>
          <option>Cloud Storage & File sharing</option>
          <option>Continuous integration</option> 
          <option>Cryptocurrency</option>
          <option>Currency Exchange</option>
          <option>Data Validation</option>
          <option>Development</option>
          <option>Dictionaries</option>
          <option>Documents & Productivity</option>
          <option>Environment</option>
          <option>Events</option>
          <option>Finance</option>
          <option>Food & Drink</option>
          <option>Games & Comics</option>
          <option>GeoCoding</option>
          <option>Government</option>
          <option>Health</option>
          <option>Jobs</option>
          <option>Machine Learning</option>
          <option>Music</option>
          <option>News</option>
          <option>Open Data</option>
          <option>Open Source Projects</option>
          <option>Patent</option>
          <option>Personality</option>
          <option>Phone</option>
          <option>Photography</option>
          <option>Science &Math</option>
          <option>Security</option>
          <option>Shopping</option>
          <option>Social</option>
          <option>Sports &Fitness</option>
          <option>Test Data</option>
          <option>Text Analysis</option>
          <option>Tracking</option>
          <option>Transportation</option>
          <option>URL Shorteners</option>
          <option>Vehicle</option>
          <option>Video</option>
          <option>Weather</option>
        </select>
        <select name="Auth">
          <option>ApiKey</option>
          <option value=''>No</option>
          <option>OAuth</option>
        </select>
        <select name="HTTPS">
          <option value=''>Select an HTTPS Option</option>
          <option>HTTPS</option>
          <option>No HTTPS</option>
        </select>
        <select name="Cors">
          <option>Yes</option>
          <option value=''>No</option>
          <option>Unknown</option>
        </select>
      </form>
    )
  }
}