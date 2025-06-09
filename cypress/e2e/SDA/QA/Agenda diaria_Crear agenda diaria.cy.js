// Importar el login page
import LoginPage from "../../../support/login.page";

describe("Agenda Diaria", () => {
  const tiempo = 50000;

  let testData;

  before(() => {
    // Leer los datos de prueba desde un archivo Excel usando la tarea personalizada
    cy.task("leerExcel", {
      archivo: "cypress/fixtures/datos_QA_SDA.xlsx",
      hoja: "AgendaDiaria",
    }).then((datos) => {
      testData = datos[0]; // Usamos el primer registro del Excel
      cy.log("Datos de prueba cargados:", testData);
    });
  });

  beforeEach(() => {
    // Realiza el login completo antes de cada prueba y navega a la sección de creación de agenda
    const ambiente = Cypress.env("CYPRESS_AMBIENTE").toUpperCase();
    LoginPage.performCompleteLogin({
      baseUrl: Cypress.env(`CY_${ambiente}_URL`),
      username: Cypress.env(`CY_${ambiente}_SDA_USER_GLOBAL`),
      password: Cypress.env(`CY_${ambiente}_SDA_PASS_GLOBAL`),
      unidadEjecutora: "#btn_seleccionar_unidad_ejecutora_hospital_mac",
      unidadArea: "#btn_seleccionar_area_administracion_local",
    });
    navigateToAgendaCreation();
  });

  function navigateToAgendaCreation() {
    // Cambiar al rol de supervisor y navegar al módulo de agendas para iniciar la creación
    cy.get("#div_nombre_usuario", { timeout: tiempo })
      .should("be.visible")
      .click();
    cy.get("#spn_menu_cambiar_cuenta", { timeout: tiempo })
      .should("be.visible")
      .click();
    cy.get("#li_seleccionar_rol_supervisor_de_tramites_y_citas", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click();
    cy.get("#btn_menu_desplegable", { timeout: tiempo })
      .should("be.visible")
      .click();
    cy.get("#spn_icono_unidades_ejecutoras_agendas", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click();
    cy.get("#btn_Agendas_Crear_Agenda", { timeout: tiempo })
      .should("be.visible")
      .click();
  }

  function fillBasicAgendaInfo() {
    // Seleccionar el servicio y personal de salud usando datos del Excel
    cy.get("#select_Agendas_Servicio")
      .should("be.visible")
      .click()
      .type(`${testData.Servicio}{enter}`)
      .blur();

    cy.get("#select_Agendas_Personal_Salud")
      .should("be.visible")
      .click()
      .clear()
      .type(`${testData.PersonalSalud}{enter}`, { delay: 500 })
      .blur();

    // Hacer clic en el botón "Crear Agenda"
    cy.get("#btn_Agendas_Crear_Agenda", { timeout: tiempo })
      .should("be.visible")
      .should("be.enabled")
      .click();

    // Establecer las fechas de inicio y finalización de la agenda
    cy.get("#date_picker_Creando_Agenda_Fecha_Inicio", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click()
      .clear()
      .type(`${testData.FechaInicio}`, { delay: 200 }) //Algunas veces falla el delay
      .tab();

    cy.get("#date_picker_Creando_Agenda_Fecha_Finalizacion", {
      timeout: tiempo,
    })
      .should("be.visible")
      .click()
      .clear()
      .type(`${testData.FechaFin}`, { delay: 200 }) //Algunas veces falla el delay
      .blur();

    // Seleccionar los días de atención definidos en los datos de prueba
    testData.DiasAtencion.split(",").forEach((dia) => {
      cy.get("#ddl_Creando_Agenda_Atencion_Semanal", {
        timeout: tiempo,
      })
        .click()
        .type(`${dia}{enter}`, { delay: 100 });
    });
    cy.get("#ddl_Creando_Agenda_Atencion_Semanal").blur();
  }

  function setupDaySchedule(day, consultorio, horaInicio, horaFin) {
    // Configurar el consultorio y horario para el día especificado
    cy.get(`#ddl_Creando_Agenda_Consultorio_${day}`, {
      timeout: tiempo,
    })
      .click()
      .type(`${consultorio}{enter}`)
      .blur();

    cy.get(`#time_picker_Creando_Agenda_Horario_${day}`, {
      timeout: tiempo,
    })
      .type(`${horaInicio}`, { delay: 100 })
      .tab()
      .type(`${horaFin}{enter}`)
      .blur();
  }

  function addAppointment(day, index, tipoCita, equivalencia, numeroCitas) {
    // Agregar una cita al día especificado usando los datos de prueba
    cy.get(`#btn_Creando_Agenda_Agregar_Cita_${day}`, {
      timeout: tiempo,
    }).click();

    cy.get(`#ddl_Creando_Agenda_Tipo_Cita_${index}_${day}`, {
      timeout: tiempo,
    })
      .click()
      .type(`${tipoCita}{enter}`)
      .blur();

    cy.get(`#ddl_Creando_Agenda_Equivalencia_${index}_${day}`, {
      timeout: tiempo,
    })
      .should("be.visible")
      .should("exist")
      .click()
      .type(`${equivalencia}{enter}`)
      .blur();

    cy.get(`#ddl_Creando_Agenda_Numero_Citas_${index}_${day}`, {
      timeout: tiempo,
    })
      .click()
      .type(`${numeroCitas}{enter}`)
      .blur();
  }

  it("Crear agenda diria", () => {
    // Llenar información básica de la agenda
    fillBasicAgendaInfo();
    // Configurar día principal con horario y consultorio
    setupDaySchedule(
      testData.DiaPrincipal,
      testData.Consultorio,
      testData.HoraInicio,
      testData.HoraFin
    );

    // Agregar citas al día principal (dos citas según datos)
    for (let i = 0; i < 2; i++) {
      addAppointment(
        testData.DiaPrincipal,
        i,
        testData[`TipoCita${i + 1}`],
        testData[`Equivalencia${i + 1}`],
        testData[`NumeroCitas${i + 1}`]
      );
    }

    // Configurar día adicional (Martes) con horario y consultorio
    setupDaySchedule(
      "Martes",
      testData.Consultorio,
      testData.HoraInicio,
      testData.HoraFin
    );

    // Agregar citas al día adicional (Martes)
    for (let i = 0; i < 2; i++) {
      addAppointment(
        "Martes",
        i,
        testData[`TipoCita${i + 1}`],
        testData[`Equivalencia${i + 1}`],
        testData[`NumeroCitas${i + 1}`]
      );
    }

    // Finalizar la creación de la agenda haciendo clic en los botones de avance

    cy.get("#btn_Creando_Agenda_Crear", { timeout: tiempo })
      .should("exist")
      .should("contain", "Crear")
      .click();
    cy.get("#btn_ConfAgendaDiaria_Siguiente", { timeout: tiempo })
      .should("exist")
      .should("contain", "Siguiente")
      .click();
    cy.get("#btn_ConfAgendaDiaria_Finalizar", { timeout: tiempo })
      .should("exist")
      .should("contain", "Finalizar")
      .click();

    // Verificar que la agenda fue creada exitosamente
    cy.get("#ntf_Creando_Agenda_Agenda_Creada", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible");

    // Capturar una captura de pantalla como evidencia de la agenda creada

    cy.screenshot("Agenda diaria/Creación de agenda diaria compleja_");
  });
});
