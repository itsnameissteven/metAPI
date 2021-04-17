import React from 'react'
import {Api} from '../../apiCalls'
import './FilterForm.css'

export interface FilterState {
  search: string;
  Categories: string[];
  Auth: string;
  HTTPS: string;
  Cors: string;
  currentCategories: JSX.Element[]
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
      currentCategories: []
    }
  }


  handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>):void => {
    this.setState({ [e.target.name]: e.target.value}, () => {
      this.props.filter(this.state)
      const matchingCards = this.props.filter(this.state)
      this.categoryOptions(matchingCards)
    })
  }

  handleCatSelection = (e: React.ChangeEvent<HTMLInputElement>):void => {
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

  categoryOptions = (apiList: Api[]=this.props.apiList) => {
    const categoryBoxes = this.allCategories().map((category, index) => {
      const categoryLengths = this.getAvailableCategoryLengths(apiList);
      return (
        <div key={category} className="category">
          <input type="checkbox" id={category} name={category} onChange={e => this.handleCatSelection(e)} />
          <label htmlFor={category}>{category + `(${categoryLengths[index]})`}</label>
        </div>
      )
    })
    if (apiList.length) this.setState({...this.state, currentCategories: categoryBoxes})
    return categoryBoxes
  }

  getAvailableCategoryLengths = (matchedCards: Api[]) => {
    const categoryLengths = this.allCategories().map(category => {
      const matchedPerCategory = matchedCards.filter(card => card.Category === category)
      return matchedPerCategory.length
    })
    return categoryLengths;
  }

  showCategories = ():JSX.Element[] | undefined => {
    if (this.state.currentCategories.length) {
      return this.state.currentCategories;
    } else {
      this.categoryOptions();
    }
  }

  render() {
    return (
      <form>

        <div className = "categories">
          {this.showCategories()}
        </div>
        <label htmlFor="search"></label>
        <input id="search" name="search" placeholder="&#61442; Search" className="search-bar" onChange={e => this.handleChange(e)}></input>
        <label htmlFor="Auth"></label>
        <select id="Auth" name="Auth" onChange={e => this.handleChange(e)}>
          <option value='all'>Auth: --All--</option>
          <option>apiKey</option>
          <option value=''>No</option>
          <option>OAuth</option>
        </select>

        <label htmlFor="HTTPS"></label>
        <select id="HTTPS" name="HTTPS" onChange={(ev) => this.handleChange(ev)}>
          <option value='all'>HTTPS: --All--</option>
          <option value='true'>HTTPS</option>
          <option value='false'>No HTTPS</option>
        </select>

        <label htmlFor="Cors"></label>
        <select id="Cors" name="Cors" onChange={e => this.handleChange(e)}>
          <option value='all'>Cors: --All--</option>
          <option value='yes'>Yes</option>
          <option value='no'>No</option>
          <option value='unknown'>Unknown</option>
        </select>

      </form>
    )
  }
}