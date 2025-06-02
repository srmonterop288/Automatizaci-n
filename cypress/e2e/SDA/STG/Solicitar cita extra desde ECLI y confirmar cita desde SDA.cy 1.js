import LoginPage from "../../../support/login.page";
import funcionesReutilizables from "../../support/funcionesReutilizables.js";

// Declaramos la variable global para almacenar los datos del Excel
let testDataList = [];

// Suite principal
describe("SDA - Integración con ECLI", () => {
  const tiempo = 50000;
  let contador = 1;

  // Se ejecuta antes de todos los casos
  before(() => {
    // Ignora errores de ResizeObserver para evitar fallas durante las pruebas
    funcionesReutilizables.ignorarErroresDeResizeObserver();

    // Carga los datos desde el archivo Excel
    cy.task("leerExcel", {
      archivo: "cypress/fixtures/datos_STG_SDA.xlsx",
      hoja: "CitasExtras",
    }).then((datos) => {
      testDataList = datos;
    });
  });

  // Generación dinámica de los casos
  it("Generar y confirmar cita extra", () => {
    // Usamos `cy.then` para esperar a que los datos estén disponibles
    cy.then(() => {
      // Validamos que haya datos
      expect(testDataList.length).to.be.greaterThan(0);

      // Iteramos cada fila del Excel
      testDataList.forEach((data, index) => {
        // Usamos cy.log para documentar el inicio del caso
        cy.log(`--- Ejecutando caso de prueba ${index + 1} ---`);

        // Login en ECLI
        const ambiente = Cypress.env("CYPRESS_AMBIENTE").toUpperCase();

        LoginPage.performCompleteLogin({
          baseUrl: Cypress.env(`CY_${ambiente}_URL`),
          username: Cypress.env(`CY_${ambiente}_ECLI_USER_DOCTOR`),
          password: Cypress.env(`CY_${ambiente}_ECLI_PASS_DOCTOR`),
          unidadEjecutora:
            "#btn_seleccionar_unidad_ejecutora_policlinica_nuevo_san_juan",
          unidadArea: "#btn_seleccionar_area_consulta_externa",
        });

        // Selecciona el rol "Médico"
        LoginPage.changeRol("#div_seleccionar_rol_medico");

        // Abre el menú desplegable, luego selecciona el módulo y submódulo
        LoginPage.navigate({
          abrirMenuDesplegable: true,
          modulo: "#spn_modulo_estaciones_clinicas_agenda",
          submodulo: "#spn_submodulo_estaciones_clinicas_agenda",
        });

        // Cierra el sidebar para brindar más espacio al módulo de "Atención del paciente"
        LoginPage.navigate({
          abrirMenuDesplegable: true,
          abrirModulo: false,
        });

        // Hace clic en el botón "+ Solicitud de citas extra"
        cy.get("#btn_Medico_agenda_solicitud_cita", { timeout: tiempo })
          .should("exist")
          .click();

        // Hace clic en el botón "+ Agregar citas extra"
        cy.get("#btn_Medico_agregar_cita_extra", { timeout: tiempo })
          .should("exist")
          .click();

        // Ingresa información en el campo "No. de identificación:"
        cy.get("#validateDNI_dni", { timeout: tiempo })
          .should("exist")
          .click()
          .type(data.Paciente);

        // Hace clic en el botón "Verificar"
        cy.get("#btn_Pantalla_Citas_Verificar", { timeout: tiempo })
          .should("exist")
          .click();

        // Hace clic e ingresa información en campo "Duración"
        cy.get("#txt_cita_extra_duracion", { timeout: tiempo })
          .should("exist")
          .click()
          .type(data.Duracion)
          .tab();

        // Ingresa la hora con un desface de minutos
        const horaConDesfase = funcionesReutilizables.obtenerHoraConDesfase(
          data.TiempoExtra
        );
        cy.get("#txt_asistencias_hora_inicio", { timeout: tiempo })
          .clear()
          .type(horaConDesfase)
          .tab();

        // Toma un screenshot a la pantalla "Solicitud de cita extra"
        cy.wait(2000);
        cy.screenshot(
          "Citas_extra_STG/Información de la solicitud de cita extra_" +
            String(contador++).padStart(2, "0")
        );

        // Hace clic en el botón "Solicitar cita extra"
        cy.get("#btn_solicitud_extra_guardar", { timeout: tiempo })
          .should("exist")
          .click();

        // Hace scroll arriba a la izquierda y toma una captura de pantalla
        cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
          timeout: tiempo,
        }).scrollTo("topLeft");

        // Valida el resultado exitoso de la solicitud
        cy.get(".ant-alert-message", { timeout: tiempo })
          .should("exist")
          .should("be.visible")
          .should("include.text", "enviada con éxito");

        // Toma un screenshot del resultado
        cy.wait(2000);
        cy.screenshot(
          "Citas_extra_STG/Solicitud de cita extra generada_" +
            String(contador++).padStart(2, "0")
        );

        // Login en SDA
        LoginPage.performCompleteLogin({
          baseUrl: Cypress.env(`CY_${ambiente}_URL`),
          username: Cypress.env(`CY_${ambiente}_SDA_USER_GLOBAL`),
          password: Cypress.env(`CY_${ambiente}_SDA_PASS_GLOBAL`),
          unidadEjecutora:
            "#btn_seleccionar_unidad_ejecutora_policlinica_nuevo_san_juan",
          unidadArea: "#btn_seleccionar_area_administracion_local",
        });

        // Selecciona el rol "Supervisor de tramites y citas"
        LoginPage.changeRol(
          "#div_seleccionar_rol_supervisor_de_tramites_y_citas"
        );

        // Abre el menú desplegable, luego selecciona el módulo y submódulo
        LoginPage.navigate({
          abrirMenuDesplegable: true,
          modulo: "#spn_modulo_unidades_ejecutoras_gestordecitas",
          submodulo: "#spn_submodulo_unidades_ejecutoras_mensajes",
        });

        // Cierra el sidebar para brindar más espacio al módulo de "Visualización de mensajes"
        LoginPage.navigate({
          abrirMenuDesplegable: true,
          abrirModulo: false,
        });

        // Hace clic en el botón "No leidos"
        cy.xpath('//*[@id="radio_group_Mensajes_Filtros"]/label[3]', {
          timeout: tiempo,
        })
          .should("exist")
          .click();

        // Abre el mensaje
        cy.xpath(
          '//*[@id="table_Mensajes_Listado_Mensajes"]/div/div/table/tbody/tr[1]/td[2]/span',
          { timeout: tiempo }
        )
          .should("exist")
          .click();

        // Hace clic en el botón "Confirmar cita"
        cy.get("#button_Detalles_Mensaje_Confirmar_Cita", {
          timeout: tiempo,
        })
          .should("exist")
          .click();

        // Hace scroll arriba a la izquierda
        cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
          timeout: tiempo,
        }).scrollTo("topLeft");

        // Valida que la cita extra fue aprobada con éxito
        cy.get(".ant-message-notice-content", { timeout: tiempo })
          .should("exist")
          .should("include.text", "confirmada");

        // Toma un screenshot al mensaje de éxito
        cy.wait(2000);
        cy.screenshot(
          "Citas_extra_STG/Cita extra confirmada_" +
            String(contador++).padStart(2, "0")
        );
      });
    });
  });
});
