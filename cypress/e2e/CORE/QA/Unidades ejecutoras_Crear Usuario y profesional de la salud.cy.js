import "@applitools/testgenai-cypress/commands";
describe("Crear Profesioal de la Salud-Unidades ejecutoras", () => {
  require("cypress-plugin-tab");
  require("cypress-xpath");

  it("debería iniciar sesión con éxito", () => {
    // Llama a la función login
    cy.login_CORE_QA();

    // Verifica que el login haya sido exitoso
    cy.url().should("not.include", "/login");

    let contador = 0;
    let imagen = 1;
    const rutaArchivoExcel = "cypress/fixtures/datos2.xlsx";
    // Leer los datos del archivo Excel
    cy.leerExcel(rutaArchivoExcel).then((datosExcel) => {
      // Mostrar los datos leídos
      console.log(datosExcel);

      // Recorrer los datos del archivo Excel
      for (let i = 1; i < datosExcel.length; i++) {
        // Comenzamos desde 1 para saltarnos la fila de encabezados
        // Tomar el valor de la primera columna (DNI)

        cy.wait(1000);
        cy.get("#btn_menu_desplegable").should("be.visible").click();
        cy.wait(1000);
        cy.get("#spn_modulo_medical_records_list_executing_units")
          .should("be.visible")
          .click();
        cy.wait(1000);
        cy.get("#btn_menu_desplegable").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.wait(100).tab();

        //Buscar Unidad Ejecutora------------------

        // Usar los datos del Excel
        // Provincia
        cy.get("#ddl_provincia_lista_unidad_ejecutora")
          .scrollIntoView()
          .should("be.visible");
        const PROVINCIA = datosExcel[i][6]; // Primer fila, primera columna (usando índices 0 basados)
        cy.get("#ddl_provincia_lista_unidad_ejecutora", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(PROVINCIA)
          .type("{enter}");

        // Usar los datos del Excel
        // Unidad Ejecutora
        cy.get("#input_unidad_ejecutora").scrollIntoView().should("be.visible");
        const UNIDADE = datosExcel[i][7]; // Primer fila, primera columna (usando índices 0 basados)
        cy.get("#input_unidad_ejecutora", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(UNIDADE)
          .click();
        cy.wait(10).tab();

        cy.get("#btn_buscar").should("be.visible").click();

        cy.get('[id^="btn_mas_opciones_unidad_ejecutora_"]').first().click();
        cy.get('[id^="btn_administrar_unidad"]').click();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.wait(10).tab();
        cy.get("#btn_crear_profesional_salud").should("be.visible").click();

        cy.get("#ddl_tipo_identificacion") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_tipo_identificacion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(1) // Toma el primer elemento
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        // Usar los datos del Excel
        // Ingresar DNI
        cy.get("#txt_tipo_identificacion")
          .scrollIntoView()
          .should("be.visible");
        const DNI = datosExcel[i][0]; // Primer fila, primera columna (usando índices 0 basados)
        cy.get("#txt_tipo_identificacion", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#btn_validar").should("be.visible").click();
        cy.wait(1000);
        cy.get("#btn_crear_usuario").should("be.visible").click();
        cy.wait(1000);

        // Usar los datos del Excel
        // Ingresar NOMBRE
        const NOMBRE = datosExcel[i][1]; // Primer fila, segunda columna
        cy.get("#input_primer_nombre", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(NOMBRE)
          .click();

        // Usar los datos del Excel
        // Ingresar APELLIDO
        const APELLIDO1 = datosExcel[i][2]; // Primer fila, segunda columna
        cy.get("#input_primer_apellido", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(APELLIDO1)
          .click();

        // Usar los datos del Excel
        // Ingresar APELLIDO MATERNO
        const APELLIDO2 = datosExcel[i][3]; // Primer fila, segunda columna
        cy.get("#input_segundo_apellido", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(APELLIDO2)
          .click();

        // Usar los datos del Excel
        // Ingresar FECHA NACIMIENTO
        const FECHANAC = datosExcel[i][4]; // Primer fila, segunda columna
        cy.get("#input_fecha_nacimiento", { timeout: 2000 }) // Espera hasta 2 segundos
          .should("exist") // Asegura que el campo esté presente en el DOM
          .should("be.visible") // Asegura que el campo sea visible
          .scrollIntoView() // Asegura que el campo esté dentro del viewport
          .type(FECHANAC); // Escribe el valor de la variable FECHANAC en el campo
        cy.wait(500).tab();

        // Pais
        cy.get("#ddl_pais_nacimiento") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_pais_nacimiento_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(163) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        // Nacionalidad
        cy.get("#ddl_nacionalidad") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_nacionalidad_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(37) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        // Etnia
        cy.get("#ddl_etnia") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_etnia_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(1) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        //Religion
        cy.get("#ddl_religion", { timeout: 2000 })
          .should("exist")
          .should("be.visible") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_religion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .scrollIntoView() // asegura que esté en el viewport
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        // Estado
        cy.get("#ddl_estado_civil") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_estado_civil_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#btn_paciente_asegurado_false").click().should("be.checked");
        cy.wait(100).tab();

        cy.get("#ddl_tipo_paciente") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_tipo_paciente_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#ddl_tipo_beneficiario") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_tipo_beneficiario_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(7) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();
        cy.wait(100).tab();

        cy.get("#ddl_ocupacion") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_ocupacion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(8) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#ddl_estudios") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_estudios_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(7) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#ddl_sexo") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_sexo_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#ddl_idioma") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_idioma_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#ddl_grupo_sanguineo") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_grupo_sanguineo_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(6) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();
        cy.wait(100).tab();

        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(100).tab();

        cy.get("#input_provincia") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#input_provincia_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(1) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#input_distrito") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#input_distrito_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#input_corregimiento") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#input_corregimiento_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#input_barrio") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#input_barrio_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(2000).tab();
        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(1000).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(2000).tab();

        //Crear Profesional de la Salud-------------------------------------------------------------------------------------------------

        cy.wait(100).tab();
        cy.get("#input_numero_empleado").scrollIntoView().should("be.visible");
        cy.get("#input_numero_empleado", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#input_numero_seguro_social", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();

        cy.get("#input_cargo_ocupado", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();
        cy.wait(100).tab();

        //correo
        const CORREO = datosExcel[i][5]; // Primer fila, segunda columna
        cy.get("#input_correo_electronico_institucional", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(CORREO)
          .click();
        cy.wait(500).tab();
        cy.wait(500);

        //turno
        cy.get("#ddl_turno") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_turno_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(2) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        //Horario
        cy.get("#input_horario_turno", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type("12:00 AM")
          .click();
        cy.wait(100).tab();

        cy.get("#input_horario_turno_fin", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type("12:00 AM")
          .click();
        cy.wait(100).tab();

        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();

        cy.get("#ddl_seleccionar_profesion") // Selecciona el campo de búsqueda
          .click({ force: true }); // Forza el clic si es necesario
        cy.wait(500);
        cy.get("#ddl_seleccionar_profesion_list .ant-select-item-option") // Selecciona los elementos de la lista
          .eq(0) // Toma el elemento 10
          .click(); // Hace clic en el primer elemento
        cy.wait(100).tab();

        cy.get("#input_numero_registro", { timeout: 1000 })
          .should("exist")
          .should("be.visible")
          .type(DNI)
          .click();
        cy.wait(100).tab();

        cy.get("#btn_agregar_profesion").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.wait(100).tab();
        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(1000);
        cy.wait(100).tab();
        cy.get("#btn_siguiente").should("be.visible").click();
        cy.wait(5000);
        cy.wait(100).tab();

        // Verificar que el Paciente fue creado exitosamente

        // Verificar que la alerta tenga el mensaje correcto y sea visible
        cy.screenshot(
          "Unidades ejecutoras_/Creación de profesional_" +
            String(imagen++).padStart(2, "0")
        );

        // Incrementar el contador
        contador++;

        // Mostrar en la consola el contador y el DNI
        cy.log(`Contador: ${contador}, DNI: ${DNI}`);
      }
    });

    cy.wait(1000);
    console.log("¡Prueba exitosa!");
    cy.log("¡Prueba exitosa!");
  });
});
