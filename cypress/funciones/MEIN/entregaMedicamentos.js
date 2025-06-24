export function entregarMedicamento(numeroDeReceta) {
  //Ingresamos al módulo de Entrega de Medicamento
  cy.get("#spn_modulo_farmacia_entregas", { timeout: 15000 }).click();
  //Agregamos el número de la receta
  cy.get("#input_farmaceutico_devolver_recetas_buscar_receta", {
    timeout: 15000,
  })
    .type(numeroDeReceta)
    .wait(4000);
  //cy.xpath('//*[@id="btn_receta_104-2025-0000057"]', {timeout:15000}).click().wait(2000)
  //Damos click al botón de la tabla
  cy.get(".ant-table-row").first().find("button").first().click();
  //Seleccionamos todos los medicamentos a entregar
  cy.xpath(
    "/html/body/div[3]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div/div/div[1]/div/table/thead/tr/th[1]/div/label",
    { timeout: 15000 }
  ).click();
  //Entregamos los medicamentos y confirmamos la entrega
  cy.get("#btn_entregar_recetas_dispensada", { timeout: 15000 }).click();
  cy.get("#btn_confirmar_entrega", { timeout: 15000 }).click().wait(4000);
}