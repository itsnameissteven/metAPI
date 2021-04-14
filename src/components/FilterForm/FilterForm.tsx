import React from 'react'
import {Api} from '../../apiCalls'
import './FilterForm.css'

export interface FilterState {
  search: string;
  Categories: string[];
  Auth: string;
  HTTPS: string;
  Cors: string;
}

type FilterProps = {
  filter(state:FilterState): Api[];
  apiList: Api[];
}
/**
 * Component responsible for rendering the filter form and handling user interaction with that form
 * 
 * @props filter - method passed down from app to create filtered sets of ApiCards based on the search params
 * @props apiList - whole dataset of the public apis passed down from app
 * @returns render method returns and displays the form component
 */
export class FilterForm extends React.Component<FilterProps> {
  state: FilterState
  constructor(props: FilterProps) {
    super(props)
    this.state = {
      search: '',
      Categories: [],
      Auth: 'all',
      HTTPS: 'all',
      Cors: 'all',
    }
  }

  handleChange = (e: any):void => {
    this.setState({ [e.target.name]: e.target.value}, () => {
      this.props.filter(this.state)
    })
  }

  handleCatSelection = (e: any):void => {
    let selectedCategories = this.state.Categories
    if (e.target.checked) {
      selectedCategories.push(e.target.name)
    } else {
      selectedCategories.splice(selectedCategories.indexOf(e.target.name), 1)
    }
    this.setState({ Categories: selectedCategories }, () => {
      this.props.filter(this.state)
    })
  }

  allCategories = ():string[] => this.props.apiList.reduce((categories: string[], {Category}) => {
    if (!categories.includes(Category)) categories.push(Category)
    return categories
  }, []);

  categoryOptions = () => this.allCategories().map(category => {
    return (
      <div key={category}>
        <input type="checkbox" id={category} name={category} onChange={e => this.handleCatSelection(e)} />
        <label htmlFor={category}>{category}</label>
      </div>
    )
  })

  render() {
    return (
      <form>
        <div className = "categories">
          {this.categoryOptions()}
        </div>
        <input name="search" placeholder="Search" className="search-bar" onChange={e => this.handleChange(e)}></input>
        <select name="Auth" onChange={e => this.handleChange(e)}>
          <option value='all'>--All--</option>
          <option>apiKey</option>
          <option value=''>No</option>
          <option>OAuth</option>
        </select>
        <select name="HTTPS" onChange={e => this.handleChange(e)}>
          <option value='all'>--All--</option>
          <option value='true'>HTTPS</option>
          <option value='false'>No HTTPS</option>
        </select>
        <select name="Cors" onChange={e => this.handleChange(e)}>
          <option value='all'>--All--</option>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
          <option value='unknown'>Unknown</option>
        </select>
      </form>
    )
  }
}