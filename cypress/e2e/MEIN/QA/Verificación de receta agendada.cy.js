require('cypress-xpath')
import 'cypress-iframe';

import {
  loginECLI, iniciarUnaConsulta, opcionesNuevaConsulta, personaNoAsistio, pacienteNoAtendido,
  loginECLISTG, loginECLIQA,
  loginECLICAP,
  obtenerIdoneaDelPaciente
} from '../../../funciones/ECLI/funciones';
import { inciarConsulta, seleccionarAgenda, servicio } from '../../../funciones/ECLI/agenda';
import { agregarOrdenesAgendada, obtenerValorReceta, seleccionarOrdenes } from '../../../funciones/ECLI/ordenes';
import { loginMEIN, loginMEINQA } from '../../../funciones/MEIN/loginMEIN';
import { bloquearPDF } from '../../../funciones/MEIN/cerrarPDF';
import { verificarReceta } from '../../../funciones/MEIN/funciones';

describe('Medicamentos e insumos', () => {
   // Ignora errores específicos del ResizeObserver
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false;
    }
  });

  it('Realiza flujo completo de consulta médica', () => {
    let numero = 0;
    let botonMasNuevo = 0;

    loginECLI("QA");

    cy.xpath('//*[@id="div_nombre_usuario"]/div/span[2]').invoke('text').then((text) => {
      const tipoRol = text.trim();
      seleccionarAgenda(tipoRol);

      iniciarUnaConsulta(tipoRol).then(({ numero: num, botonMasNuevo: boton, tipoBoton: cadena, tipoRol }) => {
        numero = num;
        botonMasNuevo = boton;
        const tipoBoton = cadena;

        if (!numero && !botonMasNuevo && !tipoBoton) {
          cy.log('NO SE ENCONTRARON CONSULTAS DISPONIBLES EN LA AGENDA SELECCIONADA');
        } else if (!botonMasNuevo) {
          cy.log('No se encontró ningún botón para la agenda.');
        } else {
          inciarConsulta(numero, botonMasNuevo, tipoBoton, tipoRol);

          //AQUÍ AGREGAMOS EL PACIENTE ATENDIDO
          obtenerIdoneaDelPaciente()

          //AQUÍ ABAJO AGREGAMOS LO MÓDULOS
          agregarOrdenesAgendada(tipoRol)
          cy.readFile('cypress/fixtures/numeroDeReceta.json').then((data) => {
              const receta = data.valor;

              //Usamos el valor
              cy.log('Leemos el campo de receta: '+receta)
              //return receta;
          });
          
        }
      });
    });
  });

  it('Flujos de MEIN sin abrir el PDF', () => {
    // ✅ Bloquear la descarga del PDF si se hace por red

    loginMEIN("QA")
    cy.readFile('cypress/fixtures/numeroDeReceta.json').then((data) => {
      const idoneaDelPaciente = data.idoneaDelPaciente;
      const receta = data.valor;
      
      //Usamos el valor
      if(idoneaDelPaciente != "" && receta != ""){
        verificarReceta(idoneaDelPaciente, receta)
      }
      else{
        cy.log("Idonea médica o Número de Receta VACIOS")
      }
      //cy.log('Leemos el campo de receta: '+receta)
      //return receta;
    });
  })

});