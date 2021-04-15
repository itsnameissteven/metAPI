import { createYield } from "typescript"

describe('metAPI', () => {

  describe('error handling', () => {

    it('test of network stubbing', () => {
      cy.intercept({
        method: 'GET',
        url: 'https://api.publicapis.org/entries'
      },
      {
        statusCode: 404
      })
      cy.visit('http://localhost:3000');

    })

  })

})