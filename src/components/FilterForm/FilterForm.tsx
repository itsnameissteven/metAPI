import React from 'react'
import {Api} from '../../apiCalls'
import './FilterForm.css'

export interface FilterState {
  search: string;
  Categories: string[];
  Auth: string;
  HTTPS: boolean | string;
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



  // handleChange = (e: any):void => {
  //   if (e.target.name !== 'HTTPS') {
  //     this.setState({...this.state, [e.target.name]: e.target.value}, () => {
  //       return this.props.filter(this.state)
  //     })
  //   } 
  //   else {
  //     let boolean: boolean;
  //     e.target.value.includes('No')? boolean = false : boolean = true;
  //     this.setState({...this.state, [e.target.name]: boolean}, () => {
  //       return this.props.filter(this.state)
  //     })    
  //   }
  // }

  handleSearch = (e: any):void => {
    this.setState({ search: e.target.value }, () => {
      this.props.filter(this.state)
    })
  }

  handleAuth = (e: any):void => {
    this.setState({ Auth: e.target.value }, () => {
      this.props.filter(this.state)
    })
  }

  handleCatSelection = (e: any):void => {
    let selectedCategories = this.state.Categories
    if (e.target.checked) {
      selectedCategories.push(e.target.name)
      this.setState({ Categories: selectedCategories })
    } else {
      selectedCategories.splice(selectedCategories.indexOf(e.target.name))
    }
    this.props.filter(this.state)
  }

  allCategories = ():string[] => this.props.apiList.reduce((categories: string[], {Category}) => {
    if (!categories.includes(Category)) categories.push(Category)
    return categories
  }, []);

  categoryOptions = () => this.allCategories().map(category => {
    return (
      <div>
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
        <input name="search" placeholder="Search" className="search-bar" onChange={e => this.handleSearch(e)}></input>
        <select name="Auth" onChange={e => this.handleAuth(e)}>
          <option value='all'>--All--</option>
          <option>apiKey</option>
          <option value=''>No</option>
          <option>OAuth</option>
        </select>
        <select name="HTTPS">
          <option value='all'>--All--</option>
          <option>HTTPS</option>
          <option>No HTTPS</option>
        </select>
        <select name="Cors">
          <option value='all'>--All--</option>
          <option>Yes</option>
          <option>No</option>
          <option>Unknown</option>
        </select>
      </form>
    )
  }
}