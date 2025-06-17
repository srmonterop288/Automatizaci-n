import { seleccionarAgenda } from "../../../funciones/ECLI/agenda";
import { agregarDiagnosticoDeSalida, agregarMotivoDeConsultra } from "../../../funciones/ECLI/evaluacion";
import { finalizarConsulta } from "../../../funciones/ECLI/Flujos";
import { iniciarUnaConsulta, loginECLI, obtenerIdoneaDelPaciente } from "../../../funciones/ECLI/funciones";
import { inciarConsulta } from "../../../funciones/ECLI/agenda";
import { agregarAntecedenteAlergico, agregarAntecedentePersonal } from "../../../funciones/ECLI/antecedentes";

describe('template spec', () => {
  it('Evaluación de paciente - Diagnóstico de salida', () => {
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
          inciarConsulta(numero, botonMasNuevo, tipoBoton, tipoRol)
          

          //AQUÍ AGREGAMOS EL PACIENTE ATENDIDO
          obtenerIdoneaDelPaciente()

          //AQUÍ ABAJO AGREGAMOS LO MÓDULOS
          agregarDiagnosticoDeSalida(tipoRol)
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
})

