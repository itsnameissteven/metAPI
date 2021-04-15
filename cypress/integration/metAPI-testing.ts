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

})