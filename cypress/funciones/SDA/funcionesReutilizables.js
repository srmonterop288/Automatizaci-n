const tiempo = 50000;

class funcionesReutilizables {
  //Metodo para controlar el error de ResizeObserver
  ignorarErroresDeResizeObserver() {
    Cypress.on("uncaught:exception", (err) => {
      if (
        err.message.includes("ResizeObserver") &&
        err.message.includes("Loop")
      ) {
        return false;
      }
    });
  }

  //Metodo para llenar el formulario de creación de agenda común

  llenarFormularioAgendaComun(datos) {
    cy.get("#txt_Modal_Crear_Agenda_Comun_Nombre_Agenda_Comun", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .type(datos.NombreAgenda)
      .tab();

    cy.get("#ddl_Modal_Crear_Agenda_Comun_Provincia", { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click()
      .focused()
      .type(`${datos.Provincia}`, { delay: 300 })
      .wait(2000)
      .type("{downarrow}")
      .wait(1000)
      .type("{enter}")
      .tab();

    cy.get("#ddl_Modal_Crear_Agenda_Comun_Unidad_Ejecutora", {
      timeout: tiempo,
    })
      .should("exist")
      .should("be.visible")
      .click()
      .focused()
      .type(`${datos.UnidadEjecutora}`, { delay: 300 })
      .wait(2000)
      .type("{downarrow}")
      .wait(2000)
      .type("{enter}")
      .tab();

    cy.get("#ddl_Modal_Crear_Agenda_Comun_Estatus", { timeout: tiempo }).click({
      force: true,
    });

    cy.get(".ant-select-item-option-content", { timeout: tiempo })
      .contains("Habilitado")
      .click({ force: true });
  }

  // Metodo para validar que la agenda fue creada correctamente
  validarAgendaCreada(nombreEsperado) {
    cy.wait("@getUnidadesEjecutoras", { timeout: 120000 }).then(
      (interception) => {
        // expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body.data).to.be.an("array").and.not.to.be
          .empty;

        const existeAgenda = interception.response.body.data.some(
          (agenda) => agenda.agendaComunNombre === nombreEsperado
        );

        expect(
          existeAgenda,
          `La agenda '${nombreEsperado}' debe estar en la lista`
        ).to.be.true;
      }
    );
  }

  // Metodo para  ingresar la fecha de inicio y fin de la agenda común
  ingresarFechasAgendaComun(
    selectorFechaInicio,
    selectorFechaFin,
    valorFechaInicio,
    valorFechaFin
  ) {
    cy.get(selectorFechaInicio, { timeout: tiempo })
      .should("exist", { timeout: tiempo })
      .should("be.visible", { timeout: tiempo })
      .click()
      .clear()
      .wait(2000)
      .type(valorFechaInicio, { delay: 100 })
      .tab();

    cy.get(selectorFechaFin, { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click()
      .clear()
      .wait(2000)
      .type(valorFechaFin, { delay: 100 })
      .blur();
  }
  // Metodo para seleccionar al personal de salud
  seleccionarPersonalSalud(personalSaludArray) {
    personalSaludArray.forEach((rol) => {
      cy.xpath(
        '//*[@id="single-spa-application:@thv/core"]/div/div/main/section/section/section/div[2]/div/form/div[2]/div/div[1]/div[2]/div/div[2]/div/div/div/div/div/div/div/div/div[1]',
        { timeout: tiempo }
      )
        .should("exist")
        .should("be.visible")
        .first()
        .click()
        .focused() // Asegura que el input está enfocado
        .clear({ force: true })
        .type(rol, { delay: 100 });

      cy.contains("#ddl_Agendas_Comun_Atencion_Semanal_list", rol, {
        timeout: tiempo,
      })
        .should("be.visible")
        .click();
    });
  }
  //  Metodo para seleccionar los enfermeros

  seleccionarEnfermero(enfermeros) {
    enfermeros.forEach((tipoEnfermero) => {
      cy.get("#ddl_Agendas_Comun_enfermeroA", { timeout: tiempo })
        .should("exist")
        .click()
        .type(tipoEnfermero, { delay: 100 })
        .type("{downarrow}{enter}");
    });
  }

  // Metodo para seleccionar los médicos
  seleccionarMedicos(medicos) {
    medicos.forEach((tipoPersonal) => {
      cy.get("#ddl_Agendas_Comun_medico", { timeout: tiempo })
        .should("exist")
        .click()
        .type(tipoPersonal, { delay: 100 })
        .type("{downarrow}{enter}");
    });
  }

  // Metodo para seleccionar el consultorio
  seleccionarConsultorio(consultorio, dia) {
    const idConsultorio = `${"#ddl_Creando_Agenda_Consultorio_"}${dia}`;
    cy.get(idConsultorio, { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click()
      .type(consultorio, { delay: 100 })
      .type("{downarrow}{enter}");
  }

  // Metodo para ingresar el horario del consultorio
  ingresarHoraConsultorio(dia, horaInicio, horaFin) {
    const idHorario = `${"#time_picker_Creando_Agenda_Horario_"}${dia}`;
    cy.get(idHorario, { timeout: tiempo })
      .should("exist")
      .should("be.visible")
      .click()
      .type(horaInicio, { delay: 100 })
      .tab()
      .type(horaFin, { delay: 100 })
      .blur();
  }

  // Metodo para seleccionar el tipo de cita
  seleccionarTipoCita(idSelector, tipoCita, indice = 0) {
    cy.get(idSelector, { timeout: tiempo })
      .eq(indice)
      .should("exist")
      .click()
      .type(tipoCita, { delay: 100 })
      .type("{enter}")
      .tab();
  }

  // Metodo para seleccionar la equivalencia
  seleccionarEquivalencia(idSelector, equivalencia, indice = 0) {
    cy.get(idSelector, { timeout: tiempo })
      .eq(indice)
      .should("exist")
      .should("be.visible")
      .click()
      .type(equivalencia, { delay: 100 })
      .type("{enter}")
      .tab();
  }
  // Metodo para ingresar el número de citas
  ingresarNumeroCitas(idSelector, citas, indice = 0) {
    cy.get(idSelector, { timeout: tiempo })
      .eq(indice)
      .should("exist")
      .should("be.visible")
      .click()
      .type(citas, { delay: 100 })
      .type("{enter}")
      .blur();
  }

  // Metodo para seleccionar un solo día
  seleccionarDiaEnDropdown(dia) {
    cy.get("#ddl_Agendas_Comun_Atencion_Semanal", { timeout: tiempo })
      .should("exist")
      .click()
      .type(dia, { delay: 100 })
      .type("{enter}");
  }

  // Metodo para seleccionar varios día
  seleccionarDiasDeAtencion(diasString) {
    const diasDeAtencion = diasString.split(",").map((item) => item.trim());
    if (diasDeAtencion.length > 0) {
      diasDeAtencion.forEach((dia) => {
        this.seleccionarDiaEnDropdown(dia);
      });
    }
  }

  // Metodo para preparar los datos de la agenda común
  prepararDatosAgendaComun(data) {
    const dias = data.DiasAtencion.split(",").map((d) => d.trim());
    const consultorios = data.Consultorio.split(",").map((c) => c.trim());
    const tipoCitas = data.TipoCita.split(",").map((t) => t.trim());
    const equivalencias = data.Equivalencia.split(",").map((e) => e.trim());
    const numeroCitas = data.NumeroCitas.split(",").map((n) => n.trim());
    const [horaInicio, horaFin] = data.HorarioConsultorio.split(",").map((h) =>
      h.trim()
    );
    const personalSalud = data.PersonalSalud.split(",").map((p) => p.trim());
    const medicos = data.Medico.split(",").map((m) => m.trim());
    const enfermeros = data.Enfermero.split(",").map((m) => m.trim());

    return {
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
    };
  }

  // metodo para obetener la hora del sistema y agregar minutos
  obtenerHoraConDesfase(minutosAdicionales) {
    const horaActual = new Date();
    horaActual.setMinutes(horaActual.getMinutes() + minutosAdicionales);

    let horas = horaActual.getHours(); // Obtiene el valor entre 0 y 23 horas
    const minutos = String(horaActual.getMinutes()).padStart(2, "0");

    const sufijo = horas >= 12 ? "pm" : "am"; // Si horas es 12 o más → "pm", Si es menor que 12 → "am".

    // Convertir a formato de 12 horas
    horas = horas % 12;
    horas = horas === 0 ? 12 : horas; // Si es 0 (medianoche), se muestra como 12

    return `${horas}:${minutos} ${sufijo}`;
  }
}

export default new funcionesReutilizables();
