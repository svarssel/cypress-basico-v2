/// <references types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })


    it('Preenchendo os campos obrigatórios e enviando o formulário', function () {
        const longText = 'alguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisaalguma coisa, alguma coisa'

        cy.clock()

        cy.get('#firstName').type('Fabiano')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('svarssel@show.com')
        cy.get('#phone').type(1234)
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('.success').should('not.be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação errada', function () {
        cy.get('#firstName').type('Fabiano')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('svarssel@show,com')
        cy.get('#phone').type(1234)
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Passando valor não numérico em telefone', function () {
        cy.get('#phone')
            .type("texto")
            .should('have.value', '')
    })

    it('Preenche e limpa dos campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Fabiano')
            .should('have.value', 'Fabiano')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Tomás')
            .should('have.value', 'Tomás')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('Fabiano@show.com')
            .should('have.value', 'Fabiano@show.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type(123456)
            .should('have.value', 123456)
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('Envia formulário com sucesso usando comandos customizados', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('Selecionando opção YouTube', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('Selecionando opção Mentoria por seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')

    })

    it('Selecionando opção Blog por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    })

    it('Marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"]').check('feedback')
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio formulário ', function () {
        cy.get('#firstName').type('Fabiano')
        cy.get('#lastName').type('Melo')
        cy.get('#email').type('svarssel@show.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Seleciona o arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            //arrastando o arquivo
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function () {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('Faz uma requisição HTTP', function () {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function (res) {
                const { status, statusText, body } = res
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it.only('Encontrar gato escondido', function () {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })

})
