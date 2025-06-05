import "@applitools/testgenai-cypress/commands";
require("cypress-plugin-tab");
require("cypress-xpath");

describe("Administrador de usuarios", () => {
  it("Asignación de rol a profesionales de la salud", () => {
    const tiempo = 50000;
    let contador = 0;
    // Llama a la función login
    cy.login_CORE_QA();

    // Verifica que el login haya sido exitoso
    cy.url().should("not.include", "/login");

    cy.get("#btn_menu_desplegable", { timeout: tiempo })
      .should("be.visible")
      .click();
    cy.get("#spn_modulo_medical_records_administrar_usuarios", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click();
    cy.get("#btn_menu_desplegable", { timeout: tiempo })
      .should("be.visible")
      .click();

    const rutaArchivoExcel = "cypress/fixtures/datos2.xlsx";

    // Leer los datos del archivo Excel
    cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
      // Recorrer los datos del archivo Excel
      for (let i = 1; i < datosExcel.length; i++) {
        // Comenzamos desde 1 para saltarnos la fila de encabezados
        // Tomar el valor de la primera columna (DNI)
        const DNI = datosExcel[i][0]; // Primer fila, primera columna (usando índices 0 basados)

        if (!DNI || DNI.trim() === "undefined") {
          // Si el DNI es undefined o vacío, finalizar correctamente el test
          cy.window().then((win) => {
            win.alert("DNI no válido o vacío. Finalizando prueba.");
          });
          return; // Detiene la ejecución del test
        }

        // Si el DNI es válido, continuar con la prueba
        cy.window().then((win) => {
          win.alert("El DNI es correcto");
        });

        cy.get("#searchNamesOrIdentifications", { timeout: tiempo })
          .scrollIntoView()
          .should("exist")
          .should("be.visible")
          .clear()
          .type(`${DNI}`, { delay: 100 });

        cy.get(".ant-spin-container .ant-spin-blur", {
          timeout: tiempo,
        }).should("not.exist");

        cy.get(".ant-table-content")
          .contains(DNI, { timeout: tiempo })
          .should("be.visible")
          .parents("tr") // subir a la fila
          .within(() => {
            cy.get('[id*="btn_ver_detalle_"]').click();
          });

        // Usar los datos del Excel
        // Ingresar NOMBRE
        const UNIDADE = datosExcel[i][7]; // Primer fila, segunda columna
        cy.get("#ddl_unidad_ejecutora", { timeout: tiempo })
          .should("exist")
          .should("be.visible")
          .type(UNIDADE, { delay: 100 })
          .type("{enter}");

        // Usar los datos del Excel
        // Ingresar APELLIDO
        cy.xpath(
          '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[2]/div/div/div[2]/div/div/div/div/div'
        )
          .scrollIntoView()
          .should("be.visible")
          .click();

        const ROL = datosExcel[i][9];
        cy.xpath(
          '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/div/div/div/div/div[3]/div[2]/form/div/div[3]/div/div/div[2]/div/div/div/div/div'
        )
          .scrollIntoView()
          .should("be.visible")
          .type(ROL, { delay: 100 })
          .type("{enter}");

        cy.get("#btn_asignar_rol").should("be.visible").click();

        // Tomamos la captura de pantalla **antes** de incrementar la variable imagen
        cy.get(".ant-alert-message")
          .scrollIntoView()
          .should("contain", "El rol ha sido asignado correctamente.")
          .and("be.visible"); // Asegura que el mensaje esté visible

        // Tomamos la captura de pantalla
        cy.screenshot("Administrador de usuarios_QA/Asignación de rol_");

        cy.get("#btn_menu_desplegable", { timeout: tiempo })
          .should("be.visible")
          .click();

        cy.get("#spn_modulo_medical_records_administrar_usuarios", {
          timeout: tiempo,
        })
          .should("be.visible")
          .click();
        cy.get("#btn_menu_desplegable", { timeout: tiempo })
          .should("be.visible")
          .click();

        // Incrementar el contador
        contador++;

        // Mostrar en la consola el contador y el DNI
        cy.log(`Contador: ${contador}, DNI: ${DNI}`);
      }
    });
  });
});
