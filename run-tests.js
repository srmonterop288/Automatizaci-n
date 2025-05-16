const { exec } = require("child_process");

const date = new Date();
const timestamp = date.toISOString().replace(/[:.]/g, "-"); // Formato: 2025-05-15T14-33-20-123Z
const outputPath = `results/test-results-${timestamp}.xml`;

//const command = `npx cypress run --spec "cypress/e2e/Reprogramar cita en turno AM y validar nueva fecha de cita en ECLI.cy.js" --reporter junit --reporter-options "mochaFile=${outputPath}"`;
const command = `npx cypress run --spec "cypress/e2e/Crear_pacientes.cy.js" --reporter junit --reporter-options "mochaFile=${outputPath}"`;

console.log("Ejecutando:", command);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️ Stderr: ${stderr}`);
  }
  console.log(`✅ Resultado:\n${stdout}`);
});