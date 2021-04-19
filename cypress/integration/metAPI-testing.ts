import { createYield } from "typescript"

describe('metAPI', () => {

  describe('error handling', () => {

    it('test 400 error', () => {
      cy.intercept({
        method: 'GET',
        url: 'https://api.publicapis.org/entries'
      },
      {
        statusCode: 404
      })
      cy.visit('http://localhost:3000');
      cy.contains('400')
    })

    it('test 500 error', () => {
      cy.intercept({
        method: 'GET',
        url: 'https://api.publicapis.org/entries'
      },
      {
        statusCode: 500
      })
      cy.visit('http://localhost:3000');
      cy.contains('500')
    })

    it('test bad path', () => {
      cy.visit('http://localhost:3000/nonexistent-page');
      cy.contains('400')
    })

  })

  describe('Sidebar', () => {
    
    beforeEach(() => {
      cy.fixture('apiData').then(( data ) => {
        cy.intercept('https://api.publicapis.org/entries', {
          statusCode: 200,
          body: data
        })
      })
      cy.visit('http://localhost:3000');
    })

    it('Should allow a user to view their saved cards in the sidebar', () => {
      cy.get('main').find('.favorite-btn__heart').first().click()
      cy.get('.arrow').click()
      cy.get('.side-bar').find('.api-card')
    })

    it('Should allow a user to click on a saved card to view the details page', () => {
      cy.get('main').find('.favorite-btn__heart').first().click()
      cy.get('.arrow').click()
      cy.get('.side-bar').find('.api-card').click()
      cy.get('.featured-card').contains('Cat Facts')
    })

    it('Should start out with no saved cards', () => {
      cy.get('.side-bar').find('.api-card').should('not.exist')
    })
  })

  describe('Filter form', () => {

    beforeEach(() => {
      cy.fixture('apiData').then(( data ) => {
        cy.intercept('https://api.publicapis.org/entries', {
          statusCode: 200,
          body: data
        })
      })
      cy.visit('http://localhost:3000')
    })

    it('Should show a user how many options are available for each category', () => {
      cy.get('form').find('.category').first().contains('Animals(13)')
    })

    it('Should allow a user to filter by category', () => {
      cy.get('form').get('.category').first().find('label').click()
      cy.get('.api-card').should('have.length', 13)
      cy.get('.api-card').first().contains('Animals')
    })

    it('Should allow a user to filter by search', () => {
      cy.get('form').find('.search-bar').type('cat').should('have.value', 'cat')
      cy.get('.api-card').should('have.length', 5)
      cy.get('.api-card').contains('cat')
    })

    it('Should allow a user to filter by Auth', () => {
      cy.get('form').find('#Auth').select('OAuth')
      cy.get('.api-card').should('have.length', 8)
      cy.get('.api-card').first().contains('OAuth')
    })

    it('Should allow a user to filter by HTTPS', () => {
      cy.get('form').find('#HTTPS').select('No HTTPS')
      cy.get('.api-card').should('have.length', 5)
      cy.get('.api-card').first().contains('HTTPS: no')
    })

    it('Should allow a user to filter by Cors', () => {
      cy.get('form').find('#Cors').select('No')
      cy.get('.api-card').should('have.length', 3)
      cy.get('.api-card').first().contains('Cors: no')
    })

    it('Should show a user an error message if no Apis meet the search criteria', () => {
      cy.get('form').find('#Cors').select('No')
      cy.get('form').find('#HTTPS').select('No HTTPS')
      cy.get('form').find('#Auth').select('OAuth')
      cy.get('main').contains('Sorry No Apis available')
    })

  })

})

describe('Selected API page', () => {
  beforeEach(() => {
    cy.fixture('apiData').then(( data ) => {
      cy.intercept('https://api.publicapis.org/entries', {
        statusCode: 200,
        body: data
      })
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should be able to click on an api to see more information', () => {
    cy.get('.api-card-link[href="/api/What Anime"]').click()
      .get('.featured-card').get('.home-link').contains('View all apis')
      .get('.featured-card').contains('What Anime')
      .get('.featured-card').contains('Scan anime')
      .get('.featured-card').contains('Authentication: no')
      .get('.featured-card').contains('Cors: yes')
      .get('.featured-card').contains('Https: yes')
      .get('.featured-card').contains('Category: Anime')
      .get('.featured-card').get('.featured-card__btn')
        .get('.external-link').should('have.attr', 'href', 'https://soruly.github.io/trace.moe/')
      .get('.featured-card').get('.save-note__btn').contains('Save Note')
  })

  it('Should be able to save a note', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.featured-card__notes').type('Create an app where Anyone can scan in an anime character')
      .get('.save-note__btn').click()
      .get('.note').contains('Create an app where Anyone can scan in an anime character')
  })

  it('Should not be able to save a note if the note is empty', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.save-note__btn').click()
      .get('.note').should('not.exist')
  })

  it('Should be able to delete a note', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.featured-card__notes').type('ops ths note ahs to may typos')
      .get('.save-note__btn').click()
      .get('.note').get('.delete-btn').click()
      .get('.note').should('not.exist')
  })

  it('Should save notes between reloads', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.featured-card__notes').type('Create an app where Anyone can scan in an anime character')
      .get('.save-note__btn').click()
      .get('.note').contains('Create an app where Anyone can scan in an anime character')
      .reload()
      .get('.note').contains('Create an app where Anyone can scan in an anime character')
  })
})

describe('Adding apis to favorites', () => {
  beforeEach(() => {
    cy.fixture('apiData').then(( data ) => {
      cy.intercept('https://api.publicapis.org/entries', {
        statusCode: 200,
        body: data
      })
    })
    cy.visit('http://localhost:3000/')
  })

  it('Should be able to save an api to favorites', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.favorite-btn__heart').should('exist')
      .get('.favorite-btn__heart--favorited').should('not.exist')
      .get('.favorite-btn-container').click()
      .get('.favorite-btn__heart--favorited').should('exist')
      .get('.favorite-btn__heart').should('not.exist')
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').contains('What Anime')
  })

  it('Should save Favorites between page load', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.favorite-btn__heart').should('exist')
      .get('.favorite-btn-container').click()
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').contains('What Anime')
      .reload()
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').contains('What Anime')
  })

  it('Should be able to remove an api from favorites from detail page', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.favorite-btn-container').click()
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').contains('What Anime')
      .get('.arrow').click()
      .get('.favorite-btn-container').click()
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').should('not.exist')
  })

  it('Should be able to remove a favorite from the the saved apis side bar', () => {
    cy.visit('http://localhost:3000/api/What%20Anime')
      .get('.favorite-btn-container').click()
      .get('.arrow').click()
      .get('.side-bar').get('.api-card').get('.favorite-btn-api-card').click()
      .get('.side-bar').get('.api-card').should('not.exist')
  })

  it('Should be able to favorite apis from the home page', () => {
    cy.get('.api-card').contains('Cat Facts')
      .get('.favorite-btn-api-card').click({ multiple: true } )
      .get('.arrow').click()
      .get('.side-bar').contains('catAPI')
      .get('.side-bar').contains('Noun Project')
      .get('.side-bar').contains('Google Books')
      .get('.side-bar').contains('Metacert')
      .get('.side-bar').contains('RandomDog')
  })
})