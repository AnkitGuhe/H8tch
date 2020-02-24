describe('Filter Epic Game', function() {

    beforeEach(function() {
        cy.server()
        cy.route('POST', 'https://graphql.epicgames.com/graphql').as('visit')
            // cy.route('POST', '/dashboard/Casino/limits/').as('limitChange')
            // cy.route('GET', '/php/casino/blackjack.php?*').as('pageLoad')
    })
    Cypress.env('filterSearchData').forEach((search) => {
        it(search.searchStr + ' filter should be visible', function() {
            cy.visit('/store/en-US/browse')
            cy.wait('@visit').its('status').should('equal', 200)
            cy.get(search.assertClass).click()
            cy.url().should('include', search.searchStr) // => true

        })

    })

});