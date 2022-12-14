
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Fabiano')
    cy.get('#lastName').type('Melo')
    cy.get('#email').type('svarssel@show,com')
    cy.get('#phone').type(1234)
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
})