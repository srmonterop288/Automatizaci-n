export function seleccionarAntecedente()
{
    cy.get('#spn_submodulo_estaciones_clinicas_antecedentes', {timeout: 20000}).click().wait(500);
}

export function agregarAntecedentePersonal(tipoRol) 
{
    // ENTRAR A LOS ANTECEDENTES PERSONALES
    seleccionarAntecedente()
    cy.get('#tab_'+tipoRol+'_antecedentes_personales', {timeout: 20000}).click().wait(500);
    //cy.get('#btn_'+tipoRol+'_antecedentes_personales_agregar', {timeout: 20000}).should('be.visible').click();

    // RECORRER TODOS LOS ANTECEDENTES EN LA TABLA
    cy.get('body').then(($body) => {
        if ($body.find(`#btn_${tipoRol}_antecedentes_personales_agregar`).length > 0) {
            // Si existe el botón
            cy.get(`#btn_${tipoRol}_antecedentes_personales_agregar`, { timeout: 20000 }).should('be.visible').click();
    
            cy.get(`#rb_${tipoRol}_antecedentes_personales_niega_encabezado`, { timeout: 20000 }).click().wait(500);
    
            cy.get('.ant-table-tbody', { timeout: 20000 }).should('be.visible').within(() => {
                cy.get('tr').each(($row, index) => {
                    index++;
                    cy.wrap($row).find('td.ant-table-cell').first().invoke('text').then((antecedente) => {
                        cy.log(`Procesando: ${antecedente.trim()}`);
    
                        cy.wrap($row).find('input[type="radio"]').last().check().wait(500);
    
                        if (antecedente.trim() === 'Fuma') {
                            cy.get(`#txt_${tipoRol}_antecedentes_personales_cigarro_${index}`).type('2');
                            cy.get(`#txt_${tipoRol}_antecedentes_personales_cajetilla_${index}`).type('2');
                            cy.wrap($row).find('textarea').type(`Prueba automatizada para ${antecedente.trim()}`, { force: true });
                        } else {
                            cy.wrap($row).find('textarea').type(`Prueba automatizada para ${antecedente.trim()}`, { force: true });
                        }
                    });
                });
            });
    
            cy.get('#btn_antecedentes_personales_guardar').click().wait(2000);
    
        } else {
            // Si NO existe el botón
            cy.log('No se puede agregar un Antecedente Personal, ya existe uno para hoy');
        }
    });
}

export function agregarAntecedenteFamiliar(tipoRol) {
  seleccionarAntecedente();
  cy.get('#tab_' + tipoRol + '_antecedentes_familiares', { timeout: 20000 })
    .click()
    .wait(3000);

  // Se agrega dos veces (puedes ajustar el ciclo)
  var i=0
  agregarTabla("Familiar", tipoRol, i);

  // Se hace clic en el botón visible que puede ser "actualizar" o "guardar"
  cy.get("button#btn_" + tipoRol + "_antecedentes-familiares_actualizar, button#btn_" + tipoRol + "_antecedentes-familiares_guardar")
    .click()
    .wait(3000);
}


export function agregarAntecedenteAlergico(tipoRol)
{
    seleccionarAntecedente()
    cy.get('#tab_'+tipoRol+'_antecedentes_alergicos', {timeout: 20000}).click().wait(3000);
    //cy.get('#btn_'+tipoRol+'_antecedentes_alergicos_agregar').should('be.visible').click().wait(1000);
    //AGREGAR ANTECEDENTE ALERGICO
    cy.get('body').then(($body) => {
        if ($body.find(`#btn_${tipoRol}_antecedentes_alergicos_agregar`).length > 0) {
            // Si existe el botón
            cy.get(`#btn_${tipoRol}_antecedentes_alergicos_agregar`, { timeout: 20000 }).should('be.visible').click();
            //Agregar todo en Niega
            cy.get('#rb_'+tipoRol+'_antecedentes_alergicos_niega_header_0').click()
    
            
                cy.get('.ant-table-tbody', { timeout: 20000 }).filter(':visible').first().should('be.visible').within(() => {
                    cy.get('tr').each(($row, index) => {
                        // Solo si el tr contiene celdas válidas
                        if ($row.find('td.ant-table-cell').length > 0) {
                            cy.wrap($row).find('td.ant-table-cell').first().invoke('text').then((antecedente) => {
                                const textoAntecedente = antecedente.trim();
                                cy.log(`Procesando: ${textoAntecedente}`);
                                cy.wrap($row).find('input[type="radio"]').last().check({ force: true }).wait(500);
                                tablaSignosVitales(textoAntecedente, index, tipoRol)
                                index++                                
                                cy.wrap($row).find('textarea').clear({ force: true }).type(`Prueba automatizada de ${textoAntecedente}`, { force: true });
                            });
                        }
                    });
                });
                cy.get('#btn_antecedentes_alergicos_guardar').click().wait(3000)

        }else{
            cy.log('No se puede agregar un Antecedente Alergico, ya existe uno para hoy')
        }
    });
    

}

function tablaSignosVitales(textoAntecedente, index, tipoRol)
{
    index--
    if(textoAntecedente === 'Alimentarias')
    {
        cy.get('#ddl_'+tipoRol+'_antecedentes_alergicos_'+index).click().type('Gluten{enter}Pescado{enter}Soja{enter}')
    }else if(textoAntecedente === 'Ambientales')
        {
            cy.get('#ddl_'+tipoRol+'_antecedentes_alergicos_'+index).click().type('Moho{enter}Polen del césped{enter}')
        }else if(textoAntecedente === 'Medicamentosas')
            {
                cy.get('#ddl_'+tipoRol+'_antecedentes_alergicos_'+index).click().type('Lomustina{enter}')
            }
    else{
        cy.log('Estas seleccionando '+textoAntecedente)
    }
}

export function agregarAntecedenteMedicamento(tipoRol)
{
    seleccionarAntecedente()
    cy.get('#tab_'+tipoRol+'_antecedentes_medicamentos', {timeout: 20000}).click().wait(3000)
    agregarTabla("Medicamento",tipoRol, 0)
    cy.get('#btn_'+tipoRol+'_antecedentes_medicamentos_guardar').click().wait(3000)
}

export function agregarAntecedenteGinecologico(tipoRol)
{
    cy.get('#lbl_sexo').invoke('text').then((text) => {
        let sexo = text.trim()
        cy.log(sexo)
        if(sexo === 'MUJER')
        {
            seleccionarAntecedente()
            cy.get('#tab_'+tipoRol+'_antecedentes_ginecologicos', {timeout: 20000}).click().wait(3000)
            cy.log('La paciente es: '+sexo)

            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_gravidez').clear().type('2')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_parto').clear().type('2')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_cesarea').clear().type('1')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_aborto').clear().type('0')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_numero_parejas').clear().type('2')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_numero_parejas').clear().type('1')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_ivsa').clear().type('5')
            //FECHAS
            const hoy = new Date();

            // FUM: hoy - 8 días
            const fechaFUM = formatearFecha(restarDias(hoy, 8));
            cy.get('#txt_' + tipoRol + '_antecedentes_ginecologicos_fum')
              .clear()
              .type(fechaFUM);

            // FUE: hoy - 5 días
            const fechaFUE = formatearFecha(restarDias(hoy, 5));
            cy.get('#txt_' + tipoRol + '_antecedentes_ginecologicos_fue')
              .clear()
              .type(fechaFUE);

            // Último papanicolau: hoy - 2 días
            const fechaPapanicolau = formatearFecha(restarDias(hoy, 2));
            cy.get('#txt_' + tipoRol + '_antecedentes_ginecologicos_ultimo_papanicolau')
              .clear()
              .type(fechaPapanicolau);

            //CICLO MENSTRUAL
            cy.get('#ddl_'+tipoRol+'_antecedentes_ginecologicos_ciclo_menstrual')
            .parent() // el input está dentro de un contenedor clickeable
            .click({ force: true });
            // Paso 2: Esperar y hacer click en la opción deseada
            cy.get('.ant-select-item-option').contains("Regular").click();


            //cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_gravidez').clear().type('5')
            cy.get('#rb_'+tipoRol+'_antecedentes_ginecologicos_menopausia_si').click()
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_edad_menopausia').clear().type('30')

            //MÉTODO DE PLANIFICACIÓN
            cy.get('#ddl_' + tipoRol + '_antecedentes_ginecologicos_metodo_planificacion')
            .parents('.ant-select')
            .first()
            .click() // Abre el dropdown

            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_fum')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_fue')
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_ultimo_papanicolau')

            cy.get('input#ddl_' + tipoRol + '_antecedentes_ginecologicos_metodo_planificacion')
              .type('El parche{enter}') // Escribe y selecciona

            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_observacion-metodo-planificacion').click().clear().type('Prueba {enter}{enter}automatizada{enter}{enter}de Gnecología')
            cy.get('#rb_'+tipoRol+'_antecedentes_ginecologicos_terapia_hormonal_si').click()
            cy.get('#txt_'+tipoRol+'_antecedentes_ginecologicos_observaciones-generales').clear().type('Prueba {enter}{enter}automatizada{enter}{enter}de Gnecologíax2')

            cy.get('#btn_antecedentes_ginecologicos_guardar').click().wait(3000)
        }
        else
        {
            cy.log('No tiene acceso a Ginecología, porque es:'+sexo)

        }
    });
    

}

// Función para restar días a una fecha
function restarDias(fecha, dias) {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() - dias);
    return nuevaFecha;
}

// Función para formatear fecha en dd-mm-yyyy
function formatearFecha(fecha) {
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Mes inicia en 0
    const anio = fecha.getFullYear();
    return `${dia}-${mes}-${anio}`;
}

export function agregarTabla(texto, tipoRol, i) {
  if (texto === 'Familiar') {
    const valoresParentesco = [
      'Padre',
      'Madre',
      'Hermanos',
      'Hijo(s)',
      'Abuelo paterno',
      'Abuela paterna',
      'Abuelo materno',
      'Abuela materna',
      'Tíos',
      'Primos',
      'Esposo/a',
      'Otros'
    ];

    // Si el primer textarea ya tiene contenido, se hace clic en "agregar familiar"
    cy.get(`#txt_${tipoRol}_antecedentes-familiares_observaciones_0`)
      .invoke('val')
      .then((valorExistente) => {
        if (valorExistente && valorExistente.trim() !== '') {
          cy.get(`#btn_${tipoRol}_antecedentes-familiares_agregar-familiar`)
            .click()
            .wait(300);
        }

        // Se espera que hayan al menos (i+1) textareas para el registro correspondiente
        cy.get(`textarea[id^="txt_${tipoRol}_antecedentes-familiares_observaciones_"]`)
          .should('have.length.at.least', i + 1)
          .eq(i)
          .invoke('attr', 'id')
          .then((fullId) => {
            const match = fullId.match(/\d+$/);
            if (match) {
              const numeroDinamico = match[0];
              const selectId = `#ddl_${tipoRol}_antecedentes-familiar_parentesco_${numeroDinamico}`;

              // Se hace clic en el contenedor visible del select (no en el input oculto)
              cy.get(selectId)
                .should('exist')
                .parents('.ant-select')
                .first()
                .click() // Se hace clic para abrir el dropdown
                .then(() => {
                  // Se obtienen las opciones disponibles (ya las que no hayan sido seleccionadas desaparecen)
                  cy.get('.ant-select-item-option', { timeout: 3000 })
                    .then(($options) => {
                      let seleccionado = false;
                      // Primero se intenta con candidatos desde el índice i hasta el final del array
                      for (let j = i; j < valoresParentesco.length; j++) {
                        const candidate = valoresParentesco[j];
                        const opcion = [...$options].find(opt => opt.innerText.trim() === candidate);
                        if (opcion) {
                          cy.wrap(opcion).scrollIntoView().click({ force: true });
                          seleccionado = true;
                          break;
                        }
                      }
                      // Si no se encontró ninguna opción, se recorre desde el principio hasta i
                      if (!seleccionado) {
                        for (let j = 0; j < i; j++) {
                          const candidate = valoresParentesco[j];
                          const opcion = [...$options].find(opt => opt.innerText.trim() === candidate);
                          if (opcion) {
                            cy.wrap(opcion).scrollIntoView().click({ force: true });
                            seleccionado = true;
                            break;
                          }
                        }
                      }
                      if (!seleccionado) {
                        cy.log('⚠️ No se encontró ninguna opción válida para seleccionar.');
                      }
    
                      // Finalmente, se escribe en el textarea la observación correspondiente
                      cy.get(`#txt_${tipoRol}_antecedentes-familiares_observaciones_${numeroDinamico}`, { timeout: 3000 })
                        .clear()
                        .type(
                          `Prueba con número dinámico: ${numeroDinamico}{enter}{enter}y automatizada{enter}{enter}para antecedente ${texto}`
                        );
                    });
                });
            }
          });
      });
  } else if (texto === 'Medicamento') {
    cy.get(`#txt_${tipoRol}_antecedentes_medicamentos_0`)
      .invoke('val')
      .then((valorExistente) => {
        if (valorExistente && valorExistente.trim() !== '') {
          cy.get(`#btn_${tipoRol}_antecedentes_medicamentos_agregar`)
            .click()
            .wait(300);
        }

        // Se espera que hayan al menos (i+1) textareas para el registro correspondiente
        cy.get(`textarea[id^="txt_${tipoRol}_antecedentes_medicamentos_"]`)
          .should('have.length.at.least', i + 1)
          .eq(i)
          .invoke('attr', 'id')
          .then((fullId) => {
            const match = fullId.match(/\d+$/);
            if (match) {
                const numeroDinamico = match[0];
                const selectId = `#ddl_${tipoRol}_antecedentes_medicamentos_${numeroDinamico}`;

                // Se hace clic en el contenedor visible del select (no en el input oculto)
                cy.get(selectId).click().type('ALFACALCIDOL 1mcg, cápsula, V.O.{enter}')
    
                // Finalmente, se escribe en el textarea la observación correspondiente
                cy.get(`#txt_${tipoRol}_antecedentes_medicamentos_${numeroDinamico}`, { timeout: 3000 }).clear()
                .type(`Prueba con número dinámico: ${numeroDinamico}{enter}{enter}y automatizada{enter}{enter}para antecedente ${texto}`);    
            }
          });
      });
  } else {
    cy.log('No hay tabla');
  }
}
