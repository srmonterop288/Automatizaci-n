export function seleccionarOrdenes()
{
    cy.get('#spn_submodulo_estaciones_clinicas_ordenes', {timeout: 20000}).click().wait(500)
}

export function agregarOrdenesDeMedicamentos(tipoRol)
{
    seleccionarOrdenes()
    cy.get('#btn_'+tipoRol+'_ordenes_receta_agregar', {timeout: 20000}).click()

    //AGREGAR UNA ORDENES DE MEDICAMENTOS
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_catalogo', {timeout: 20000}).click().type('PARACETAMOL (ACETAMINOFÉN) 500mg, tableta, V.O.').wait(2000).type('{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_dosis', {timeout: 20000}).type('50{enter}')
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_frecuencia', {timeout: 20000}).click().type('Cada 12 Horas{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_duracion', {timeout: 20000}).type('10')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_observaciones', {timeout: 20000}).type('Prueba automatizada de órdenes de medicamentos')
    cy.get('#rb_'+tipoRol+'_ordenes_receta_ventanilla', {timeout: 20000}).click()
    cy.get('#btn_ordenes_receta_medicamento_confirmar', {timeout: 20000}).click().wait(1000)
    cy.get('#btn_ordenes_receta_confirmar').click().wait(3000)

    tomarValorDeLaReceta()
    cy.wait(2000)
}


export function agregarOrdenesTitulada(tipoRol)
{
    seleccionarOrdenes()
    cy.get('#btn_'+tipoRol+'_ordenes_receta_agregar', {timeout: 20000}).click()

    //AGREGAR UNA ORDENES DE MEDICAMENTOS
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_catalogo', {timeout: 20000}).click().type('PARACETAMOL (ACETAMINOFÉN) 500mg, tableta, V.O.').wait(2000).type('{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_dosis', {timeout: 20000}).type('50{enter}')
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_frecuencia', {timeout: 20000}).click().type('Cada 12 Horas{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_duracion', {timeout: 20000}).type('10')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_observaciones', {timeout: 20000}).type('Prueba automatizada de órdenes de medicamentos')
    cy.get('#rb_'+tipoRol+'_ordenes_receta_ventanilla', {timeout: 20000}).click()
    cy.get('#btn_ordenes_receta_medicamento_confirmar', {timeout: 20000}).click().wait(1000)
    cy.get('#btn_'+tipoRol+'_ordenes_receta_productos_agregar', {timeout: 20000}).click()

    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_catalogo', {timeout: 20000}).click().type('PARACETAMOL (ACETAMINOFÉN) 500mg, tableta, V.O.').wait(2000).type('{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_dosis', {timeout: 20000}).type('100{enter}')
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_frecuencia', {timeout: 20000}).click().type('Cada 6 Horas{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_duracion', {timeout: 20000}).type('5')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_observaciones', {timeout: 20000}).type('Prueba automatizada de órdenes de medicamentos')
    cy.get('#rb_'+tipoRol+'_ordenes_receta_ventanilla', {timeout: 20000}).click()
    cy.get('#btn_ordenes_receta_medicamento_confirmar', {timeout: 20000}).click().wait(1000)

    cy.get('#btn_ordenes_receta_confirmar').click().wait(3000)

    tomarValorDeLaReceta()
    cy.wait(2000)
}

export function agregarOrdenesAgendada(tipoRol)
{
    seleccionarOrdenes()
    cy.get('#btn_'+tipoRol+'_ordenes_receta_agregar', {timeout: 20000}).click()

    //Agendada
    cy.get('#btn_'+tipoRol+'_ordenes_receta_medicamento_indicacion_agenda', {timeout: 20000}).click()
  .should('have.attr', 'aria-checked', 'false') // verifica que está desactivado
  .click() // hace clic para activarlo
  .should('have.attr', 'aria-checked', 'true');

    //AGREGAR UNA ORDENES DE MEDICAMENTOS
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_catalogo', {timeout: 20000}).click().type('PARACETAMOL (ACETAMINOFÉN) 300-325mg con CODEÍNA FOSFATO 30mg, tableta, V.O.').wait(2000).type('{enter}')
    

// 1. Hacer clic en el campo del DatePicker (usamos el ID del input)
cy.get('#dtp_Doctor_ordenes_receta_medicamento_fecha_inicio').click({ force: true });

// 2. Esperar a que se muestre el panel del calendario y hacer clic en la celda de hoy
cy.get('.ant-picker-cell-today')
  .should('be.visible')
  .click();

    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_duracion', {timeout: 20000}).type('5{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_lunes', {timeout: 20000}).type('5{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_observaciones', {timeout: 20000}).type('Prueba automatizada de órdenes de medicamentos')
    cy.get('#rb_'+tipoRol+'_ordenes_receta_ventanilla', {timeout: 20000}).click()
    cy.get('#btn_ordenes_receta_medicamento_confirmar', {timeout: 20000}).click().wait(1000)

    cy.get('#btn_ordenes_receta_confirmar').click().wait(3000)

    tomarValorDeLaReceta()
    cy.wait(2000)
}


export function agregarOrdenesProlongada(tipoRol)
{
    seleccionarOrdenes()
    cy.get('#btn_'+tipoRol+'_ordenes_receta_agregar', {timeout: 20000}).click()

    //AGREGAR UNA ORDENES DE MEDICAMENTOS
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_catalogo', {timeout: 20000}).click().type('PARACETAMOL (ACETAMINOFÉN) 500mg, tableta, V.O.').wait(2000).type('{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_dosis', {timeout: 20000}).type('50{enter}')
    cy.get('#ddl_'+tipoRol+'_ordenes_receta_medicamento_frecuencia', {timeout: 20000}).click().type('Cada 12 Horas{enter}')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_duracion', {timeout: 20000}).type('10')
    cy.get('#txt_'+tipoRol+'_ordenes_receta_medicamento_observaciones', {timeout: 20000}).type('Prueba automatizada de órdenes de medicamentos')
    cy.get('#rb_'+tipoRol+'_ordenes_receta_ventanilla', {timeout: 20000}).click()
    cy.get('#btn_ordenes_receta_medicamento_confirmar', {timeout: 20000}).click().wait(1000)
    cy.get('td.ant-table-cell-fix-right-first button.ant-dropdown-trigger').click();

    cy.get('#btn_'+tipoRol+'_ordenes_receta_prolongar', {timeout: 20000}).click()
    cy.get('#txt_'+tipoRol+'_ordenes_receta_modal_duplicar_por', {timeout: 20000}).type('1')

    
    cy.get('#btn_ordenes_receta_modal_prolongar').click().wait(3000)

    cy.get('#btn_ordenes_receta_confirmar').click().wait(3000)

    tomarValorDeLaRecetaProl()
    cy.wait(2000)
}


export function tomarValorDeLaReceta() {
    // Apunta al primer <span> dentro de una celda de tabla
    return cy.get('td.ant-table-cell span.ant-typography').first().invoke('text').then((texto) => {
        const numeroDeReceta = texto.trim();
        cy.log('Valor capturado antes de mandar:', numeroDeReceta);
        //cy.writeFile('cypress/fixtures/numeroDeReceta.json', { numeroDeReceta });
        cy.readFile('cypress/fixtures/numeroDeReceta.json').then((data) => {
            data.valor = numeroDeReceta; // Solo actualizamos esta propiedad

            // Escribir de nuevo el archivo completo con el nuevo valor
            cy.writeFile('cypress/fixtures/numeroDeReceta.json', data);

            cy.log('Guardado idónea del paciente:', numeroDeReceta);
            //cy.wait(20000)
        });     
    });
}

export function tomarValorDeLaRecetaProl() {
cy.get('.ant-alert-message')
  .invoke('text')
  .then((text) => {
    const match = text.match(/\d+/); // Extrae el número
    if (match) {
      const numero = match[0]; // Solo el texto del número
      const numeroDeReceta = `${numero}-1`; // Concatenar "-1"

      cy.readFile('cypress/fixtures/numeroDeReceta.json').then((data) => {
        data.valor = numeroDeReceta; // Actualiza el valor

        cy.writeFile('cypress/fixtures/numeroDeReceta.json', data); // Guarda en archivo

        cy.log('Guardado número de receta:', numeroDeReceta);
      });
    }
  });
  }