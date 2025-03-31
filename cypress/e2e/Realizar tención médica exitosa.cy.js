//import 'cypress-mysql';

//Requerimiento para untilizar archivos CSV
const neatCSV = require('neat-csv');

describe('Prueba de Login', () => {
  
  //Comandos a seguir antes de la automatización
 /* let table; //Creacion de variable
  cy
      .fixture('Prueba.csv') //Selecciona el archivo que esta en la carpeta fictures
      .then(neatCSV) //Convierte el archivo en un objeto
      .then(data => {
        table = data; //Asignación a la variable tabla todo el Objeto llamado datos.
      })
      .then(console.table) */ 
  it('Happy path', () => {
    /*try {
      // Ejecuta una consulta SQL para seleccionar todos los usuarios de la tabla usuarios
      cy.mysql("select id, first_name, email, password from users;").then((result) => {
        // Muestra el resultado en la consola o en el log
        console.log('Resultado de la consulta:', result);

        // Verifica que se haya recuperado al menos un usuario
        expect(result.length).to.be.greaterThan(0);

        // Verifica que los datos de los usuarios sean correctos
        result.forEach((usuario) => {
          expect(usuario).to.have.property('id');
          expect(usuario).to.have.property('first_name');
          expect(usuario).to.have.property('email');
          expect(usuario).to.have.property('password');
          // Agrega más aserciones según sea necesario para verificar otros campos
        });
      });
    } catch (error) {
      // Maneja el error si la conexión a la base de datos falla
      cy.log('Error de conexión a la base de datos:', error);
      // Puedes agregar aquí acciones adicionales, como tomar una captura de pantalla o mostrar un mensaje de error
      throw error; // Lanza el error para que la prueba falle
    }*/

   //URL a gestionar
    cy.visit('https://front-core-stg.nuevoexpediente.com/login')

    //Login
    cy.get('#input_nombre_usuario_login').type("132-546-021") //Escribir información
    cy.get('#input_contrasena_login').type("Password01")
    cy.get('#btn_ingresar_login').click();
    cy.get('#btn_seleccionar_unidad_ejecutora_ciudad_de_la_salud').should('be.visible').click();
    cy.get('#btn_seleccionar_area_consulta_externa').should('be.visible').click(); //Dar clic en un elemento
    //cy.screenshot('1 - Login') //Tomar Captura de pantalla

    //Agenda Médica
    cy.get('#btn_menu_desplegable').should('be.visible').click();
    cy.get('#spn_icono_atencion_medica').should('be.visible').click();
    cy.get('#spn_submodulo_agenda').should('be.visible').click();

    //Seleccionar paciente
    cy.get('#btn_Doctor_agenda_continuar_0', { timeout: 20000 }).should('be.visible').click();
    //cy.get('#btn_Doctor_agenda_iniciar_consulta', { timeout: 20000 }).should('be.visible').click();
    //cy.get('#spn_icono_evaluacion').should('be.visible').click();

    //Generar Nota Médica
    //cy.xpath('//*[@id="rc-tabs-1-tab-1"]').click();
    //cy.contains('Nota Médica', { timeout: 20000 }).should('be.visible').click();
    cy.get('#tab_Doctor_evaluacion_medica_notas_medicas', { timeout: 5000 }).should('be.visible').click();
    cy.get('#btn_Doctor_notas_medicas_agregar_nota').should('be.visible').click();
    cy.get('#btn_Doctor_notas_medicas_nota_medica').should('be.visible').type('Hola mundo todo bien por el momento');
    cy.get('#btn_Doctor_notas_medicas_guardar').click();
    
    //Generar Diagnóstico de Salida
    //cy.contains('Diagnóstico de Salida', { timeout: 20000 }).should('be.visible').click();
    cy.get('#tab_Doctor_evaluacion_medica_diagnostico_salida', { timeout: 5000 }).should('be.visible').click();
    cy.get('#btn_Doctor_diagnostico_salida_agregar_diagnostico', { timeout: 20000 }).should('be.visible').click();
    cy.get('#rb_Doctor_diagnostico_salida_nuevo', { timeout: 20000 }).click();
    cy.get('#ddl_Doctor_diagnostico_salida_enfermedad').type('Asma{enter}');
    cy.get('#input_Doctor_diagnostico_salida_observacion').type('Todo bien por el momento');
    cy.get('#rb_Doctor_diagnostico_salida_estatus_confirmado').click();
    cy.get('#btn_Doctor_diagnostico_salida_guardar').click();

    //Finalizar Consulta
    cy.get('#btn_Doctor_diagnostico_salida_finalizar_consulta').click();
    cy.get('#btn_Doctor_diagnostico_salida_guardar', { timeout: 20000 }).click();
    cy.wait(2000); // Ajusta según lo que necesites

    // Tomar una captura de pantalla mejorada
    cy.screenshot('Consulta Atendida/1 - Atendido', {
      capture: 'fullPage' // Captura toda la página
    });



    /*cy.get('.ant-btn ant-btn-primary').contains("OK").should('be.visible').click();*/
  })
})