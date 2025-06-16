export function seleccionarProcedimiento()
{
    cy.get('#spn_submodulo_estaciones_clinicas_procedimientos', {timeout: 20000}).click().wait(500)
}

export function agregarProcedimiento(tipoRol)
{
    seleccionarProcedimiento() 
    for(var i=0;i<=9;i++)
        {
            cy.get('#'+tipoRol+'_btn_procedimientos_agregar_procedimiento').click().wait(500)

            //AGREGAR UN PROCEDIMIENTO
            cy.get('#'+tipoRol+'_ddl_procedimientos_nombre').click().wait(1000).type('00.02.1{enter}00.24{enter}00.59{enter}')
            cy.get('#txt_'+tipoRol+'_procedimientos_cantidad_ejecutada').focus().type('{selectall}{backspace}3')
            cy.get('#btn_'+tipoRol+'_add').click().wait(1000)
            cy.get('#btn_'+tipoRol+'_guardar').click().wait(1000)
            cy.get('#'+tipoRol+'_btn_procedimientos_modal_actualizar_procedimiento_confirmar').should('be.visible').click().wait(3000)
        }   
    /*cy.get('#'+tipoRol+'_btn_procedimientos_agregar_procedimiento').click().wait(500)

    //AGREGAR UN PROCEDIMIENTO
    cy.get('#'+tipoRol+'_ddl_procedimientos_nombre').click().wait(1000).type('00.02.1{enter}00.24{enter}00.59{enter}')
    cy.get('#txt_'+tipoRol+'_procedimientos_cantidad_ejecutada').focus().type('{selectall}{backspace}3')
    cy.get('#btn_'+tipoRol+'_add').click().wait(1000)
    cy.get('#btn_'+tipoRol+'_guardar').click().wait(1000)
    cy.get('#'+tipoRol+'_btn_procedimientos_modal_actualizar_procedimiento_confirmar').should('be.visible').click().wait(3000)*/
}