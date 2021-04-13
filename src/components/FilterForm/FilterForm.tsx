import React from 'react'
import {Api} from '../../apiCalls'
import './FilterForm.css'

export interface FilterState {
  search: string;
      Categories: string;
      Auth: string;
      HTTPS: boolean | string;
      Cors: string;
  }

type FilterProps = {
  filter: any;
  apiList: Api[];
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
    if (e.target.name !== 'HTTPS') {

      this.setState({...this.state, [e.target.name]: e.target.value}, () => {
        return this.props.filter(this.state)
      })
    } 
    else {
      let boolean: boolean;
      e.target.value.includes('No')? boolean = false : boolean = true;
      this.setState({...this.state, [e.target.name]: boolean}, () => {
        return this.props.filter(this.state)
      })    
    }
  }

  allCategories = ():string[] => this.props.apiList.reduce((categories: string[], {Category}) => {
    if (!categories.includes(Category)) categories.push(Category)
    return categories
  }, []);

  categoryOptions = () => this.allCategories().map(category => <option>{category}</option>)

  render() {
    return (
      <form
      onChange={this.handleChange}
      onSubmit={(e) => e.preventDefault()}>
        <input name="search" placeholder="Search" className="search-bar"></input>
        <select name="Categories" className="categories">
          <option value=''>All Categories</option>
          {this.categoryOptions()}
        </select>
        <select name="Auth">
          <option value='empty'>Select an Auth option</option>
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
          <option value=''>Select a Cors option</option>
          <option>Yes</option>
          <option>No</option>
          <option>Unknown</option>
        </select>
      </form>
    )
  }
}