describe('Search bar Epic Game', function() {

    beforeEach(function() {
        cy.server()
        cy.route('POST', 'https://graphql.epicgames.com/graphql').as('visit')
    })

    it('Should be visible ', function() {
        cy.visit(`/store/en-us/`)
        cy.wait('@visit').its('status').should('equal', 200)
        cy.get('[data-testid=search-bar]')
    });

    it('should have a placeholder and search icon ', function() {
        cy.visit('/store/en-US/')
        cy.wait('@visit').its('status').should('equal', 200)
        cy.get('[data-testid=search-bar]').should('have.attr', 'placeholder', 'Search')
        cy.get('.SearchBar-searchOpenButton_840538aa')
    });
    it('Clear should be disabled when there is no search input', function() {
        cy.visit('/store/en-US/')
        cy.wait('@visit').its('status').should('equal', 200)
        cy.get('.SearchBar-searchCloseButton_cac46da0').should('have.class', 'SearchBar-invisible_c84be50e')

    });
    it('Clear should be enabled when there is a search input', function() {
        cy.visit('/store/en-US/')
        cy.wait('@visit').its('status').should('equal', 200)
        cy.get('[data-testid=search-bar]').type('Jo')
        cy.get('.SearchBar-searchCloseButton_cac46da0').should('not.have.class', 'SearchBar-invisible_c84be50e')
    });

    it('Auto search', function() {
        Cypress.env("gameSearchData").forEach(search => {
            cy.visit("/store/en-US/browse");
            cy.get("[data-testid=search-bar]").type(search.searchStr.slice(0, 3));
            cy.get("div[role=navigation] > div").within(() => {
                cy.get("a").should($a => {
                    const href = $a.map((i, el) => {
                        return Cypress.$(el).attr("href");
                    });
                    expect((href.get()).includes(search.assertUrl)).to.be.true;
                });
            });
        });
    });
})