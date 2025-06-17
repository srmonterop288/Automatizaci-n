import { bloquearPDF } from "./cerrarPDF";


export function verificarReceta(idoneaDelPaciente, numeroDeReceta)
{
    let imagen = 1;
    cy.get('#spn_modulo_farmacia_verificacion', { timeout: 20000 }).should('be.visible').click().wait(3000);

    //Seleccionamos el INPUT
    cy.get('#number').clear().type(idoneaDelPaciente);

    // Esperar hasta que aparezca la opción en el dropdown y hacer click
    cy.get('.ant-select-item-option', { timeout: 15000 }).first().should('be.visible').click();
    cy.get('#btn_validar_paciente', { timeout: 15000 }).click() //Damos click n el botón de validar paciente

    cy.get('#input_tecnico_preparacion_buscar_numero_receta', { timeout: 15000 }).type(numeroDeReceta)

    cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/div[1]/div/div/div/div/div/table/thead/tr/th[2]/div/label', { timeout: 15000 }).click()

    // Asegurarse de que el botón esté listo antes de hacer clic
    cy.get('#btn_mostrar_acciones_trascripcion', { timeout: 15000 }).parent().should('be.visible');

    // Clic en botón que dispara el visor PDF
    cy.get('#btn_mostrar_acciones_trascripcion', { timeout: 15000 }).parent().click()
    cy.xpath('/html/body/div[4]/div/ul/li[3]', { timeout: 15000 }).click()

    // ✅ Si el visor PDF aparece como iframe, eliminarlo para evitar que bloquee el test
    bloquearPDF()
    cy.log('✅ Flujo continuado sin abrir el PDF');


cy.wait(2000);
const now = new Date();
const timestamp = now.toISOString().replace(/[:.]/g, "-"); // Reemplaza caracteres inválidos
cy.screenshot(
  `Verificación de Receta/Receta_${String(imagen++).padStart(2, "0")}_${timestamp}`
);


}

export function preparacionMedicamento(numeroDeReceta) {
  cy.get('#spn_modulo_farmacia_preparacion', { timeout: 15000 }).click();

  //Buscamos el tipo de RECETARIO donde se encuentra
  recetarioMedicamento(numeroDeReceta)
  
  //Mandamos a preparar la receta
  cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[4]/div/div[2]/div/div/div/div/div/div/div/div/div/div/table/tbody/tr[2]/td[7]/button', {timeout: 15000}).click()
  cy.xpath('/html/body/div[4]/div/ul/li', {timeout:15000}).click().wait(2000)

  //Seleccionamos el medicamento
  cy.xpath('//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[3]/div[2]/div/div[3]/div/div[2]/div/div/div/div/div/table/tbody/tr/td[1]/p', {timeout: 15000}).click().wait(3000)
  cy.get('#btn_recetario_preparacion_de_medicamentos_guardar_seleccion_medicamentos', {timeout: 15000}).click()

  //Guardamos la preparación del medicamento
  cy.get('#btn_recetario_terminar_preparacion', {timeout:15000}).click()
  cy.get('#btn_recetario_preparacion_de_medicamentos_confimar_modal_confirmar', {timeout:15000}).click().wait(3000)
  
}

function recetarioMedicamento(numeroDeReceta) {
    // Abre el dropdown para obtener todas las opciones de recetarios
  cy.get('#input_tecnico_preparacion_seleccionar_deposito')
    .closest('.ant-select') // apunta al contenedor del select
    .click();

  // Espera a que carguen las opciones del dropdown
  cy.get('.ant-select-item-option', { timeout: 20000 }).then($options => {
    const recetarios = [...$options].map(option => option.innerText.trim());

    let encontrada = false;

    // Iterar sobre recetarios
    cy.wrap(recetarios).each((recetario) => {
      // Si ya fue encontrada, termina iteración
      cy.then(() => {
        if (encontrada) return;

        cy.log(`🔍 Buscando en recetario: ${recetario}`);

        // Abre el dropdown de nuevo
        cy.get('#input_tecnico_preparacion_seleccionar_deposito')
          .closest('.ant-select')
          .click({ force: true }); // click forzado sobre el contenedor visible

        // Selecciona el recetario actual
        cy.get('.ant-select-item-option')
          .contains(recetario)
          .click({ force: true }).wait(2000);

        // Limpia e ingresa número de receta
        cy.get('#input_tecnico_preparacion_buscar_numero_receta', { timeout: 10000 })
          .clear()
          .type(numeroDeReceta)
          .wait(3000); // Espera a que cargue la tabla

        // Verifica si hay filas en la tabla
        cy.get('body').then($body => {
          const filas = $body.find('.ant-table-row');
          if (filas.length > 0) {
            encontrada = true;
            cy.log(`✅ Receta encontrada en recetario: ${recetario}`);

            // Aquí puedes hacer click en los botones de acción si lo necesitas
          } else {
            cy.log(`❌ No se encontró en recetario: ${recetario}`);
          }
        });
      });
    });
  });
}

export function dispensacionMedicamento(numeroDeReceta){
  //Ingresamos al módulo de dispensación de medicamento
  cy.get('#spn_modulo_farmacia_recetas', {timeout: 15000}).click().wait(1000)
  //Agregamos el número de la receta
  cy.get('#input_farmaceutico_lista_recetas_buscar_receta', {timeout: 15000}).type(numeroDeReceta).wait(4000)
  //Selecionamos el botón con el medicamento y dispensamos todos los medicamentos
  cy.xpath('/html/body/div[2]/div/div/main/section/section/div[1]/div[4]/div/div/div/div/div/table/tbody/tr/td[1]/button', {timeout: 15000}).click()
  cy.xpath('/html/body/div[3]/div/div[2]/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/table/thead/tr/th[1]/div/label/span/input', {timeout: 15000}).click()
  //imprimimos el turno, confirmamos y bloqueamos los PDF's
  cy.get('#btn_imprimir_turno', {timeout: 15000}).click()
  bloquearPDF()
  cy.get('#btn_confirmar_dispensar_receta', {timeout: 15000}).click()
  bloquearPDF()
}

export function entregarMedicamento(numeroDeReceta){

  //Ingresamos al módulo de Entrega de Medicamento
  cy.get('#spn_modulo_farmacia_entregas', {timeout:15000}).click()
  //Agregamos el número de la receta
  cy.get('#input_farmaceutico_devolver_recetas_buscar_receta', {timeout:15000}).type(numeroDeReceta).wait(4000)
  //cy.xpath('//*[@id="btn_receta_104-2025-0000057"]', {timeout:15000}).click().wait(2000)
  //Damos click al botón de la tabla
  cy.get('.ant-table-row').first().find('button').first().click();
  //Seleccionamos todos los medicamentos a entregar
  cy.xpath('/html/body/div[3]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div/div/div[1]/div/table/thead/tr/th[1]/div/label', {timeout:15000}).click()
  //Entregamos los medicamentos y confirmamos la entrega
  cy.get('#btn_entregar_recetas_dispensada', {timeout:15000}).click()
  cy.get('#btn_confirmar_entrega', {timeout:15000}).click().wait(4000)

}

export function transcripciónRecetaSimple(){
  
}