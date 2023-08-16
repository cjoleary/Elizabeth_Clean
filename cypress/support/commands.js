// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
//     let themeID = (Cypress.env('THEME_ID) === undefined) ? require('credentials.json').theme_id : Cypress.env('THEME_ID');
    
//     let full_path = `${url}?preview_theme_id=${themeID}`;

//     // originalFn is the existing `visit` command that you need to call
//     // and it will receive whatever you pass in here
//     return originalFn(full_path, options);
// });