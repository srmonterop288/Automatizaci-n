import { bloquearPDF } from "./cerrarPDF";


export function pestañaVerificacionReceta() {
  cy.get("#spn_modulo_farmacia_verificacion", { timeout: 20000 })
    .should("be.visible")
    .click()
    .wait(3000);
}

export function buscarPacienteVerificacionReceta(idoneaDelPaciente) {
  pestañaVerificacionReceta();
  //Ingresamos el paciente en la Verificación de Receta
  cy.window().then((win) => win.focus());
  cy.get("#number").clear().type(idoneaDelPaciente);
  cy.get(".ant-select-item-option", { timeout: 30000 })
    .first()
    .should("be.visible")
    .click();
}

export function verificarReceta(idoneaDelPaciente, numeroDeReceta) {
  let imagen = 1;
  buscarPacienteVerificacionReceta(idoneaDelPaciente);

  // Esperar hasta que aparezca la opción en el dropdown y hacer click
  cy.get("#btn_validar_paciente", { timeout: 15000 }).click(); //Damos click n el botón de validar paciente

  cy.get("#input_tecnico_preparacion_buscar_numero_receta", {
    timeout: 15000,
  }).type(numeroDeReceta);

  cy.xpath(
    '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/div[1]/div/div/div/div/div/table/thead/tr/th[2]/div/label',
    { timeout: 15000 }
  ).click();

  // Asegurarse de que el botón esté listo antes de hacer clic
  cy.get("#btn_mostrar_acciones_trascripcion", { timeout: 15000 })
    .parent()
    .should("be.visible");

  // Clic en botón que dispara el visor PDF
  cy.get("#btn_mostrar_acciones_trascripcion", { timeout: 15000 })
    .parent()
    .click();
  cy.xpath("/html/body/div[4]/div/ul/li[3]", { timeout: 15000 }).click();

  // ✅ Si el visor PDF aparece como iframe, eliminarlo para evitar que bloquee el test
  bloquearPDF();
  cy.log("✅ Flujo continuado sin abrir el PDF");

  cy.wait(2000);
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, "-"); // Reemplaza caracteres inválidos
  cy.screenshot(
    `Verificación de Receta/Receta_${String(imagen++).padStart(
      2,
      "0"
    )}_${timestamp}`
  );
}

export function transcripciónRecetaSimple(
  idoneaDelPaciente,
  contrasenaConcatenada,
  numeroRecetaConcatenada
) {
  buscarPacienteVerificacionReceta(idoneaDelPaciente);

  // Esperar hasta que aparezca la opción en el dropdown y hacer click
  cy.get("#btn_validar_paciente", { timeout: 15000 }).click(); //Damos click n el botón de validar paciente
  cy.get("#btn_transcribir_receta", { timeout: 15000 }).click();

  //EEscribir Contraseña y Número de Receta
  cy.get("#doctor_form_password", { timeout: 15000 }).type(
    contrasenaConcatenada
  );
  cy.get("#doctor_form_external_receta", { timeout: 15000 }).type(
    numeroRecetaConcatenada
  );
  cy.get("#btn_continuar_transcribir_receta_medico", {
    timeout: 15000,
  }).click();
  bloquearPDF();

  //Buscar y sleccionar Receta
  cy.get("#input_tecnico_preparacion_buscar_numero_receta", { timeout: 15000 })
    .type(numeroRecetaConcatenada)
    .wait(3000);
  cy.get("#btn_mostrar_acciones_trascripcion", { timeout: 15000 }).click();
  cy.get("#btn_editar_transcripcion", { timeout: 15000 }).click();

  //Recrear la receta
  cy.xpath('//*[@id="issueDate"]', { timeout: 15000 }).click().wait(1000);
  cy.xpath("/html/body/div[4]/div/div/div/div/div[2]/ul/li/a", {
    timeout: 15000,
  }).click();
  cy.get("#institution", { timeout: 15000 }).click();
  cy.contains(".ant-select-item-option", "Gubernamental", {
    timeout: 10000,
  }).click();
  cy.get("#nombreMedico", { timeout: 15000 }).type("Anna");
  //cy.get('#especialidadId', {timeout:15000}).click()
  //cy.contains('.ant-select-item-option', 'Urología', { timeout: 10000 }).click();
  cy.xpath(
    '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/div/div/div[1]/div/div/div/div/div[1]/div/table/tbody/tr[1]/td[1]/label/span/span',
    { timeout: 15000 }
  ).click();
  cy.get("#btn_continuar_transcribir_receta_paciente", {
    timeout: 15000,
  }).click();

  //Escribir la Receta Nueva
  recrearRecetaMEIN();

  cy.get("#btn_continuar_transcribir_receta_enviar", { timeout: 15000 })
    .click()
    .wait(1000);
  cy.get("#btn_confirmar_envio_recetas", { timeout: 15000 }).click().wait(3000);

  cy.readFile("cypress/fixtures/numeroDeReceta.json").then((data) => {
    data.valor = numeroRecetaConcatenada; // Actualiza el valor

    cy.writeFile("cypress/fixtures/numeroDeReceta.json", data); // Guarda en archivo

    cy.log("Guardado número de receta:", numeroRecetaConcatenada);
  });
}

function recrearRecetaMEIN() {
  cy.fixture("medicamentos.json").then((listaMedicamentos) => {
    cy.wrap(listaMedicamentos).each((medicamento) => {
      //cy.log('💊 Medicamento:', medicamento.nombre);
      //cy.log('📦 Tipo:', medicamento.tipo);

      // Aquí haces lo que quieras con cada medicamento
      cy.get("#grupo", { timeout: 15000 }).click();
      cy.contains(".ant-select-item-option", medicamento.tipo, {
        timeout: 10000,
      }).click();
      cy.get("#input_receta_nombre_medicamento", { timeout: 15000 })
        .type(medicamento.nombre + "{enter}")
        .wait(1000);
      if (medicamento.tipo === "Tabletas") {
        cy.xpath(
          "/html/body/div[2]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/form/div[1]/form/div[3]/div[1]/div/div[3]/div/div/div[2]/div[1]/div/div/div/input",
          { timeout: 15000 }
        )
          .click()
          .type("2");
      } else if (medicamento.tipo === "Inyectables") {
        cy.xpath(
          "/html/body/div[2]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/form/div[1]/form/div[3]/div[1]/div/div[1]/div/div/div[2]/div/div/div/div/input",
          { timeout: 15000 }
        ).type("5");
      } else {
        cy.log("No encontramos ese medicamento");
      }

      cy.xpath(
        "/html/body/div[2]/div/div/main/section/section/div/div[5]/div[2]/div/div[2]/form/div[1]/form/div[3]/div[2]/div/div[2]/div/div/div[2]/div/div/div/div/span/span[1]/input",
        { timeout: 15000 }
      )
        .click()
        .type("Cada 24 Horas{enter}");
      cy.get("#input_receta_duracion_medicamento", { timeout: 15000 }).type(
        "1"
      );
      cy.get("#btn_agregar_medicamento", { timeout: 15000 }).click();

      // Espera o click que necesites
      cy.wait(1000);
    });
  });
}