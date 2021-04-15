import { FilterState } from './components/FilterForm/FilterForm';
import { Api } from './apiCalls'

export const filterByCategory = (matchedCards: Api[], stateObj: FilterState) => {
  if (stateObj.Categories.length) {
    return matchedCards.filter(api => stateObj.Categories.includes(api.Category))
  } else {
    return matchedCards
  }
}

export const filterBySearch = (matchedCards: Api[], stateObj: FilterState) => {
  if (stateObj.search.length) {
    return matchedCards.filter(api => api.API.toLowerCase().includes(stateObj.search.toLowerCase()))
  } else {
    return matchedCards
  }
}

export const filterByAuth = (matchedCards: Api[], stateObj: FilterState) => {
  if (stateObj.Auth !== 'all') {
    return matchedCards.filter(api => api.Auth === stateObj.Auth)
  } else {
    return matchedCards
  }
}

export const filterByHTTPS = (matchedCards: Api[], stateObj: FilterState) => {
  if (stateObj.HTTPS !== 'all') {
    return matchedCards.filter(api => stateObj.HTTPS === 'true' ? api.HTTPS === true : api.HTTPS === false)
  } else {
    return matchedCards
  }
}

export const filterByCors = (matchedCards: Api[], stateObj: FilterState) => {
  if (stateObj.Cors !== 'all') {
    return matchedCards.filter(api => api.Cors === stateObj.Cors)
  } else {
    return matchedCards
  }
}