describe('Visit Epic Game', function() {

    beforeEach(function() {
        cy.server()
        cy.route('POST', 'https://graphql.epicgames.com/graphql').as('visit')
        cy.route('GET', 'https://www.epicgames.com/store/en-US/api/content/products/*').as('gameContent')
        cy.visit('/store/en-US/browse')
        cy.wait('@visit').its('status').should('equal', 200)

    })

    Cypress.env('gameTitles').forEach((e) => {
        it(`Home page : ${e.game} should function correctly `, () => {
            cy.get('[class^=OfferTitleInfo-title_]').contains(e.game).click();
            cy.url().should('include', e.href)
            cy.get('.NavigationHorizontal-item_7b610e46 > span').contains(e.game)
        })
    })
})