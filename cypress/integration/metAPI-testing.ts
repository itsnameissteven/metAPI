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
      cy.visit('http://localhost:3000');
      cy.get('.hamburger').click()
    })

    it('Should allow a user to view their saved cards in the sidebar', () => {
      cy.get('main').find('.favorite-btn__heart').first().click()
      cy.get('.side-bar').find('.api-card')
    })

    it('Should allow a user to click on a saved card to view the details page', () => {
      cy.get('main').find('.favorite-btn__heart').first().click()
      cy.get('.side-bar').find('.api-card').click()
      cy.get('.featured-card').contains('Cat Facts')
    })

    it('Should start out with no saved cards', () => {
      cy.get('.side-bar').find('.api-card').should('not.exist')
    })
  })

  describe.only('Filter form', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('Should show a user how many options are available for each category', () => {
      cy.get('form').find('.category').first().contains('Animals(13)')
    })

    it('Should allow a user to filter by category', () => {
      cy.get('form').get('.category').first().find('label').click()
      cy.get('.api-card').should('have.length', 13)
    })

    it('Should allow a user to filter by search', () => {
      cy.get('form').find('.search-bar').type('cat').should('have.value', 'cat').wait(1000)
    })
  })

})