import { bloquearPDF } from "./cerrarPDF";

export function dispensacionMedicamento(numeroDeReceta) {
  //Ingresamos al módulo de dispensación de medicamento
  cy.get("#spn_modulo_farmacia_recetas", { timeout: 15000 }).click().wait(1000);
  //Agregamos el número de la receta
  cy.get("#input_farmaceutico_lista_recetas_buscar_receta", { timeout: 15000 })
    .type(numeroDeReceta)
    .wait(4000);
  //Selecionamos el botón con el medicamento y dispensamos todos los medicamentos
  cy.xpath(
    "/html/body/div[2]/div/div/main/section/section/div[1]/div[4]/div/div/div/div/div/table/tbody/tr/td[1]/button",
    { timeout: 15000 }
  ).click();
  cy.xpath(
    "/html/body/div[3]/div/div[2]/div/div[1]/div/div[2]/div[2]/div/div/div/div[1]/div/table/thead/tr/th[1]/div/label/span/input",
    { timeout: 15000 }
  ).click();
  //imprimimos el turno, confirmamos y bloqueamos los PDF's
  cy.get("#btn_imprimir_turno", { timeout: 15000 }).click();
  bloquearPDF();
  cy.get("#btn_confirmar_dispensar_receta", { timeout: 15000 }).click();
  bloquearPDF();
}