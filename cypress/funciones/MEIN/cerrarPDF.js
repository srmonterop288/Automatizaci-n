export function bloquearPDF(){
    cy.get('iframe').then($iframe => {
    if ($iframe.length > 0) {
      cy.log('⛔️ Eliminando iframe del visor PDF');
      $iframe.remove();
    }
  });
}