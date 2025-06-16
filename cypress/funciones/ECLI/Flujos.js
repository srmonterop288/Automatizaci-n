import { loginECLI, iniciarUnaConsulta, opcionesNuevaConsulta, personaNoAsistio, pacienteNoAtendido} from './funciones';
import { inciarConsulta, seleccionarAgenda} from './agenda';
import { agregarMotivoDeConsultra, agregarSignosVitales, agregarExploracionFisica, agregarNotasClinicas, agregarDiagnosticoDeSalida } from './evaluacion';
import { antecedentePersonal, antecedenteFamiliar, agregarAntecedentePersonal, agregarAntecedenteFamiliar, agregarAntecedenteAlergico, agregarAntecedenteMedicamento, agregarAntecedenteGinecologico} from './antecedentes';
import { agregarProcedimiento } from './procedimientos';
import { agregarOrdenesDeMedicamentos } from './ordenes';

function botonFinalizar(tipoRol)
{
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_finalizar_consulta', {timeout: 20000}).should('be.visible').wait(2000).click()
    /*if(cy.get('#btn_'+tipoRol+'_diagnostico_salida_alert_form', {timeout: 20000}).should('be.visible'))
    {
        cy.get('#btn_'+tipoRol+'_diagnostico_salida_alert_form', {timeout: 20000}).should('be.visible').click()
    }*/
}

export function finalizarConsulta(tipoRol)
{
    botonFinalizar(tipoRol)
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_guardar', {timeout: 20000}).click().wait(3000)

}


export function reiniciarConsulta(tipoRol)
{
    botonFinalizar(tipoRol)
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_reiniciar_2').click().wait(500)
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_reiniciar_1').click().wait(1000)
    cy.get('#txt_'+tipoRol+'_diagnostico_salida_motivo_reiniciar').parents('.ant-select').click().type('Consulta iniciada por error{enter}').wait(500)
    cy.get('#btn_'+tipoRol+'_diagnostico_salida_guardar').click().wait(3000)
}

export function evaluacionCompleta(tipoRol)
{
    agregarMotivoDeConsultra(tipoRol)
    agregarSignosVitales(tipoRol)
    agregarExploracionFisica(tipoRol)
    agregarNotasClinicas(tipoRol)
    agregarDiagnosticoDeSalida(tipoRol)
}

export function antecedenteCompleta(tipoRol)
{
    agregarAntecedentePersonal(tipoRol)
    agregarAntecedenteFamiliar(tipoRol)
    agregarAntecedenteAlergico(tipoRol)
    agregarAntecedenteMedicamento(tipoRol)
    agregarAntecedenteGinecologico(tipoRol)
}

export function ordenesCompleta(tipoRol)
{
    agregarOrdenesDeMedicamentos(tipoRol)
}

export function procedimiento(tipoRol)
{
    agregarProcedimiento(tipoRol)
}

export function happyPath(tipoRol){
    evaluacionCompleta(tipoRol)
    antecedenteCompleta(tipoRol)
    ordenesCompleta(tipoRol)
    procedimiento(tipoRol)
    finalizarConsulta(tipoRol)
}