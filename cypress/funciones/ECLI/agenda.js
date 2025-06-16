export function seleccionarAgenda(tipoRol)
{
    cy.get('#spn_submodulo_estaciones_clinicas_agenda', {timeout: 20000}).should('be.visible').click().wait(5000)
    //cy.get('.ant-select-selection-search-input', { timeout: 10000 }).should('be.visible').click().type('60{enter}');
    servicio(tipoRol)
}

export function servicio(tipoRol)
{
    cy.get('#rb_servicio_'+tipoRol, {timeout: 20000}).click()
}

export function inciarConsulta(numero, botonMasNuevo, tipoBoton, tipoRol)
{
    if (tipoBoton === 'iniciar')
    {
        cy.get(`#${botonMasNuevo.id}`, {timeout: 20000}).click().wait(500)
        cy.get('#btn_'+tipoRol+'_agenda_iniciar_consulta', {timeout: 20000}).should('be.visible').click().wait(2000)
    }
    else if(tipoBoton === 'continuar')
    {
        cy.get(`#${botonMasNuevo.id}`, {timeout: 20000}).click()
    }
    cy.wait(2000)
}