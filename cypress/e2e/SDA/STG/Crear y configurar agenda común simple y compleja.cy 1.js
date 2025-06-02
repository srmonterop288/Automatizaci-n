import LoginPage from "../../../support/login.page";
import funcionesReutilizables from "../../support/funcionesReutilizables";

describe("SDA - Agenda Común", () => {
  const tiempo = 50000;
  let contador = 1;
  let testDataList = [];

  // Ignora errores de ResizeObserver para evitar fallas durante las pruebas
  funcionesReutilizables.ignorarErroresDeResizeObserver();

  // Carga los datos del archivo Excel antes de ejecutar las pruebas
  before(() => {
    cy.task("leerExcel", {
      archivo: "cypress/fixtures/datos_STG_SDA.xlsx",
      hoja: "AgendaComun",
    }).then((datos) => {
      testDataList = datos;
      cy.log("Datos de prueba cargados:", testDataList);
    });
  });

  // Realiza login completo antes de cada prueba
  beforeEach(() => {
    const ambiente = Cypress.env("CYPRESS_AMBIENTE").toUpperCase();
    LoginPage.performCompleteLogin({
      baseUrl: Cypress.env(`CY_${ambiente}_URL`),
      username: Cypress.env(`CY_${ambiente}_SDA_USER_GLOBAL`),
      password: Cypress.env(`CY_${ambiente}_SDA_PASS_GLOBAL`),
      unidadEjecutora:
        "#btn_seleccionar_unidad_ejecutora_automation_hospital_mac",
      unidadArea: "#btn_seleccionar_area_administracion_local",
    });
  });

  // Caso de prueba para crear y configurar una agenda común simple
  it("Crear y configurar agendas común simple ", () => {
    const data = testDataList[0];
    const {
      dias,
      consultorios,
      tipoCitas,
      equivalencias,
      numeroCitas,
      horaInicio,
      horaFin,
      personalSalud,
      medicos,
      enfermeros,
    } = funcionesReutilizables.prepararDatosAgendaComun(data);

    // Cambia al rol de Coordinador Nacional de Reges
    LoginPage.changeRol("#div_seleccionar_rol_coordinador_nacional_de_reges");
    // Navega al módulo y submódulo de Agenda Común
    LoginPage.navigate({
      modulo: "#spn_modulo_unidades_ejecutoras_gestordeagendas",
      submodulo: "#spn_submodulo_unidades_ejecutoras_agenda_comun",
    });

    // Abre el modal para crear una nueva agenda común
    cy.get("#btn_Models_Agenda_Abrir_Modal_Crear_Agenda_Común", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .click();
    cy.get(".ant-modal-content .ant-modal-header", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .should("contain", "Crear nueva agenda común");

    // Llama función reutilizable para llenar el formulario de agenda común
    funcionesReutilizables.llenarFormularioAgendaComun(data);

    // Avanza al siguiente paso en el modal
    cy.get("#btn_Modal_Crear_Agenda_Comun_Siguiente", { timeout: tiempo })
      .should("exist")
      .click();
    // Valida que los datos de la agenda se muestran correctamente
    cy.get("#form_Modal_Modelos_Agendas_Comunes", { timeout: tiempo })
      .should("exist")
      .should("include.text", data.NombreAgenda)
      .should("include.text", data.Provincia)
      .should("include.text", data.UnidadEjecutora);

    // Intercepta la solicitud para filtrar agendas
    cy.intercept(
      "GET",
      "https://back-executing-units-stg.nuevoexpediente.com/v2/agendas-comunes/filtrar?filtroAgenda=TODOS"
    ).as("getUnidadesEjecutoras");

    // Confirma la creación de la agenda
    cy.get("#btn_Modal_Crear_Agenda_Comun_Detalles_Confirmar", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .click();

    // Valida que la agenda fue creada exitosamente
    funcionesReutilizables.validarAgendaCreada(data.NombreAgenda);
    cy.get(".ant-alert-message", { timeout: tiempo })
      .should("exist")
      .should("include.text", "Agenda común creada");

    // Desplaza la página hacia arriba y toma un screenshot
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");
    cy.wait(3000);
    cy.screenshot(
      "Agenda_común_STG/Creación de agenda común simple_" +
        String(contador++).padStart(2, "0")
    );

    // Cambia al rol de Supervisor de trámites y citas
    LoginPage.changeRol(
      "#div_seleccionar_rol_supervisor_de_tramites_y_citas",
      false
    );
    // Navega nuevamente al submódulo Agenda Común
    LoginPage.navigate({
      submodulo: "#spn_submodulo_unidades_ejecutoras_agenda_comun",
      abrirMenuDesplegable: false,
      abrirModulo: false,
    });
    LoginPage.navigate({ abrirMenuDesplegable: true, abrirModulo: false });

    // Busca la agenda creada en la tabla
    cy.contains(".ant-table-tbody", data.NombreAgenda, {
      timeout: tiempo,
    }).should("exist");

    // Abre la configuración de la agenda encontrada
    cy.xpath(
      '//*[@id="table_Models_Agenda_Creados"]/div/div/table/tbody/tr[1]/td[7]/button',
      { timeout: tiempo }
    )
      .should("exist")
      .click();
    cy.get("#btn_Modelos_Agenda_Comun_Configurado", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();

    // Selecciona el servicio de la agenda común
    cy.get("#select_Agendas_Comun_Servicio", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();
    cy.get("#select_Agendas_Comun_Servicio", { timeout: tiempo }).as(
      "inputServicio"
    );
    cy.get("@inputServicio").type(`${data.Servicio}`, {
      delay: 500,
    });
    cy.get("@inputServicio").type("{enter}");

    // Ingresa las fechas de inicio y fin
    funcionesReutilizables.ingresarFechasAgendaComun(
      "#date_picker_Agendas_Comun_Fecha_Inicio",
      "#date_picker_Agendas_Comun_Fecha_Finalizacion",
      data.FechaInicio,
      data.FechaFin
    );

    // Selecciona los días de atención
    funcionesReutilizables.seleccionarDiasDeAtencion(data.DiasAtencion);

    // Desplaza hacia arriba antes de continuar
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");

    // Selecciona el personal de salud, enfermeros y médicos
    funcionesReutilizables.seleccionarPersonalSalud(personalSalud);
    funcionesReutilizables.seleccionarEnfermero(enfermeros);
    funcionesReutilizables.seleccionarMedicos(medicos, { timeout: tiempo });

    // Configura los consultorios y citas para cada día
    dias.forEach((dia, index) => {
      const consultorio = consultorios[index % consultorios.length];
      funcionesReutilizables.seleccionarConsultorio(consultorio, dia);
      funcionesReutilizables.ingresarHoraConsultorio(dia, horaInicio, horaFin);

      // Agrega cada tipo de cita con su equivalencia y número de citas
      for (let citaIndex = 0; citaIndex < tipoCitas.length; citaIndex++) {
        cy.get('[id="btn_Creando_Agenda_Agregar_Cita"]', { timeout: tiempo })
          .eq(index)
          .should("exist")
          .should("be.visible")
          .click();
        funcionesReutilizables.seleccionarTipoCita(
          `[id="ddl_Creando_Agenda_Tipo_Cita_${citaIndex}"]`,
          tipoCitas[citaIndex],
          index
        );
        funcionesReutilizables.seleccionarEquivalencia(
          `[id="ddl_Creando_Agenda_Equivalencia_${citaIndex}"]`,
          equivalencias[citaIndex],
          index
        );
        funcionesReutilizables.ingresarNumeroCitas(
          `[id="ddl_Creando_Agenda_Numero_Citas_${citaIndex}"]`,
          numeroCitas[citaIndex],
          index
        );
      }
    });

    // Hace clic en el botón final de "Crear"
    cy.get("#btn_Agendas_Comun_Crear", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();

    // Valida en el modal que los datos finales coincidan
    cy.get(".ant-modal-body", { timeout: tiempo })
      .should("include.text", testDataList[0].NombreAgenda)
      .should("include.text", testDataList[0].UnidadEjecutora)
      .should("include.text", testDataList[0].FechaInicio)
      .should("include.text", testDataList[0].FechaFin);

    // Confirma la configuración final de la agenda común
    cy.contains(".ant-modal-body button", "Confirmar").click();

    // Valida que la alerta confirme que se configuró exitosamente
    cy.get(".ant-alert-content .ant-alert-message", { timeout: tiempo })
      .should("exist")
      .should("include.text", "Se ha configurado la agenda común con éxito.");
    cy.get(".ant-alert-content .ant-alert-message", { timeout: tiempo })
      .should("include.text", "configurado")
      .should("include.text", "agenda común");

    // Toma screenshot final de la configuración
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");
    cy.wait(1000);
    cy.screenshot(
      "Agenda_común_STG/Configuración de agenda común simple_" +
        String(contador++).padStart(2, "0")
    );
  });

  it("Crear y configurar una agenda común compleja", () => {
    const data = testDataList[1];
    const {
      dias,
      consultorios,
      tipoCitas,
      equivalencias,
      numeroCitas,
      horaInicio,
      horaFin,
      personalSalud,
      medicos,
      enfermeros,
    } = funcionesReutilizables.prepararDatosAgendaComun(data);

    // Cambia al rol de Coordinador Nacional de Reges
    LoginPage.changeRol("#div_seleccionar_rol_coordinador_nacional_de_reges");
    // Navega al módulo y submódulo de Agenda Común
    LoginPage.navigate({
      modulo: "#spn_modulo_unidades_ejecutoras_gestordeagendas",
      submodulo: "#spn_submodulo_unidades_ejecutoras_agenda_comun",
    });

    // Abre el modal para crear una nueva agenda común
    cy.get("#btn_Models_Agenda_Abrir_Modal_Crear_Agenda_Común", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .click();
    cy.get(".ant-modal-content .ant-modal-header", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .should("contain", "Crear nueva agenda común");

    // Llama función reutilizable para llenar el formulario de agenda común
    funcionesReutilizables.llenarFormularioAgendaComun(data);

    // Avanza al siguiente paso en el modal
    cy.get("#btn_Modal_Crear_Agenda_Comun_Siguiente", { timeout: tiempo })
      .should("exist")
      .click();
    // Valida que los datos de la agenda se muestran correctamente
    cy.get("#form_Modal_Modelos_Agendas_Comunes", { timeout: tiempo })
      .should("exist")
      .should("include.text", data.NombreAgenda)
      .should("include.text", data.Provincia)
      .should("include.text", data.UnidadEjecutora);

    // Intercepta la solicitud para filtrar agendas
    cy.intercept(
      "GET",
      "https://back-executing-units-stg.nuevoexpediente.com/v2/agendas-comunes/filtrar?filtroAgenda=TODOS"
    ).as("getUnidadesEjecutoras");

    // Confirma la creación de la agenda
    cy.get("#btn_Modal_Crear_Agenda_Comun_Detalles_Confirmar", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .click();

    // Valida que la agenda fue creada exitosamente
    funcionesReutilizables.validarAgendaCreada(data.NombreAgenda);
    cy.get(".ant-alert-message", { timeout: tiempo })
      .should("exist")
      .should("include.text", "Agenda común creada");

    // Desplaza la página hacia arriba y toma un screenshot
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");
    cy.wait(3000);
    cy.screenshot(
      "Agenda_común_STG/Creación de agenda común compleja_" +
        String(contador++).padStart(2, "0")
    );

    // Cambia al rol de Supervisor de trámites y citas
    LoginPage.changeRol(
      "#div_seleccionar_rol_supervisor_de_tramites_y_citas",
      false
    );
    // Navega nuevamente al submódulo Agenda Común
    LoginPage.navigate({
      submodulo: "#spn_submodulo_unidades_ejecutoras_agenda_comun",
      abrirMenuDesplegable: false,
      abrirModulo: false,
    });
    LoginPage.navigate({ abrirMenuDesplegable: true, abrirModulo: false });

    // Busca la agenda creada en la tabla
    cy.contains(".ant-table-tbody", data.NombreAgenda, {
      timeout: tiempo,
    }).should("exist");

    // Abre la configuración de la agenda encontrada
    cy.xpath(
      '//*[@id="table_Models_Agenda_Creados"]/div/div/table/tbody/tr[1]/td[7]/button',
      { timeout: tiempo }
    )
      .should("exist")
      .click();
    cy.get("#btn_Modelos_Agenda_Comun_Configurado", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();

    // Selecciona el servicio de la agenda común
    cy.get("#select_Agendas_Comun_Servicio", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();
    cy.get("#select_Agendas_Comun_Servicio", { timeout: tiempo }).as(
      "inputServicio"
    );
    cy.get("@inputServicio").type(`${data.Servicio}`, {
      delay: 500,
    });
    cy.get("@inputServicio").type("{enter}");

    // Ingresa las fechas de inicio y fin
    funcionesReutilizables.ingresarFechasAgendaComun(
      "#date_picker_Agendas_Comun_Fecha_Inicio",
      "#date_picker_Agendas_Comun_Fecha_Finalizacion",
      data.FechaInicio,
      data.FechaFin
    );

    // Selecciona los días de atención
    funcionesReutilizables.seleccionarDiasDeAtencion(data.DiasAtencion);

    // Desplaza hacia arriba antes de continuar
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");

    // Selecciona el personal de salud, enfermeros y médicos
    funcionesReutilizables.seleccionarPersonalSalud(personalSalud);
    funcionesReutilizables.seleccionarEnfermero(enfermeros);
    funcionesReutilizables.seleccionarMedicos(medicos, { timeout: tiempo });

    // Configura los consultorios y citas para cada día
    dias.forEach((dia, index) => {
      const consultorio = consultorios[index % consultorios.length];
      funcionesReutilizables.seleccionarConsultorio(consultorio, dia);
      funcionesReutilizables.ingresarHoraConsultorio(dia, horaInicio, horaFin);

      // Agrega cada tipo de cita con su equivalencia y número de citas
      for (let citaIndex = 0; citaIndex < tipoCitas.length; citaIndex++) {
        cy.get('[id="btn_Creando_Agenda_Agregar_Cita"]', { timeout: tiempo })
          .eq(index)
          .should("exist")
          .should("be.visible")
          .click();
        funcionesReutilizables.seleccionarTipoCita(
          `[id="ddl_Creando_Agenda_Tipo_Cita_${citaIndex}"]`,
          tipoCitas[citaIndex],
          index
        );
        funcionesReutilizables.seleccionarEquivalencia(
          `[id="ddl_Creando_Agenda_Equivalencia_${citaIndex}"]`,
          equivalencias[citaIndex],
          index
        );
        funcionesReutilizables.ingresarNumeroCitas(
          `[id="ddl_Creando_Agenda_Numero_Citas_${citaIndex}"]`,
          numeroCitas[citaIndex],
          index
        );
      }
    });

    // Hace clic en el botón final de "Crear"
    cy.get("#btn_Agendas_Comun_Crear", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click();

    // Valida en el modal que los datos finales coincidan
    cy.get(".ant-modal-body", { timeout: tiempo })
      .should("include.text", testDataList[1].NombreAgenda)
      .should("include.text", testDataList[1].UnidadEjecutora)
      .should("include.text", testDataList[1].FechaInicio)
      .should("include.text", testDataList[1].FechaFin);

    // Confirma la configuración final de la agenda común
    cy.contains(".ant-modal-body button", "Confirmar").click();

    // Valida que la alerta confirme que se configuró exitosamente
    cy.get(".ant-alert-content .ant-alert-message", { timeout: tiempo })
      .should("exist")
      .should("include.text", "Se ha configurado la agenda común con éxito.");
    cy.get(".ant-alert-content .ant-alert-message", { timeout: tiempo })
      .should("include.text", "configurado")
      .should("include.text", "agenda común");

    // Toma screenshot final de la configuración
    cy.get(".ant-layout-content.css-dev-only-do-not-override-5wsri9", {
      timeout: tiempo,
    }).scrollTo("topLeft");
    cy.wait(1000);
    cy.screenshot(
      "Agenda_común_STG/Configuración de agenda común compleja_" +
        String(contador++).padStart(2, "0")
    );
  });
});
