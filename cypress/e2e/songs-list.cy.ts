describe('empty spec', () => {
  it('Open Login Screen', () => {
    cy.visit('http://localhost:4200')
  })
  it('Be in /songs page', () => {
    cy.location('pathname').should('eq', '/songs')
  })
  it('Should have toolbar on the top', () => {
    cy.get('#application-title').should('contain.text', 'Alleva Playlist')
    cy.get('#songs-list-table').should('exist')
    cy.get('#song-create-button').should('exist')
    cy.get('#song-id-1-edit').should('exist')
    cy.get('#song-id-1-delete').should('exist')
    cy.get('#song-id-1-artist').should('exist')
    cy.get('#song-id-1-year').should('exist')
  })
  
  it('Route to edit song form', () => {
    cy.get('#song-id-1-edit').click()
    cy.location('pathname').should('eq', '/songs/song/1')
  })

  it('Test > Songs Edit Form edit', () => {
    //Check Form fields exist
    cy.get('#song-form-save-button').should('exist')
    cy.get('#song-form-title').should('exist')
    cy.get('#song-form-title-field').should('exist')
    cy.get('#song-form-year-field').should('exist')
    cy.get('#song-form-artist-field').should('exist')
    cy.get('#song-form-title').should('contain.text', 'Edit Song')
    
    //Test Form fields 
    cy.get('#song-form-title-field').click().clear()
    cy.get('#song-form-save-button').should('be.disabled')
    cy.get('body').click(0,0);
    cy.get('#song-form-title-error-required').should('exist')

    cy.get('#song-form-title-field').type('Geeth')
    cy.get('#song-form-save-button').should('not.be.disabled').click()
    cy.location('pathname').should('eq', '/songs')
    cy.get('#song-id-1-title').should('contains.text', 'Geeth')
  })

  it('Route to create song form', () => {
    cy.get('#song-create-button').should('exist').click()
    cy.location('pathname').should('eq', '/songs/song/new')
  })

  it('Test > Songs Edit Form Create', () => {
    //Check Form fields exist
    cy.get('#song-form-save-button').should('exist')
    cy.get('#song-form-title').should('exist')
    cy.get('#song-form-title-field').should('exist')
    cy.get('#song-form-year-field').should('exist')
    cy.get('#song-form-artist-field').should('exist')
    cy.get('#song-form-title').should('contain.text', 'Create Song')
    
    //Test Form fields 
    cy.get('#song-form-title-field').click().clear()
    cy.get('#song-form-save-button').should('be.disabled')
    cy.get('body').click(0,0);
    cy.get('#song-form-title-error-required').should('exist')

    //Fill Form to create new song
    cy.get('#song-form-title-field').type('Geeth')
    cy.get('#song-form-year-field').type('2000')
    cy.get('#song-form-artist-field').type('Geeth')
    cy.get('#song-form-save-button').should('not.be.disabled').click()
    cy.location('pathname').should('eq', '/songs')
    cy.get('#song-id-1-title').should('contains.text', 'Geeth')
  })
})