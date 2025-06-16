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

export function preparacionReceta()
{
    cy.get('#spn_modulo_farmacia_preparacion', {timeout: 15000}).click()
}