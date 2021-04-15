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
})