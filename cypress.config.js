const { defineConfig } = require('cypress');
const dayjs = require('dayjs');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const timestamp = dayjs().format('YYYYMMDD_HHmmss'); // Timestamp para nombre único

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, mocha-junit-reporter',
    mochawesomeReporterOptions: {
      reportDir: 'results',
      overwrite: false,
      html: false,
      json: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: `results/test-results-${timestamp}.xml`,
      toConsole: false,
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('after:run', (results) => {
        console.log('🎯 Evento after:run disparado.');
        
        // Asegúrate de que la carpeta 'results' exista
        const reportDir = path.join(__dirname, 'results');
        if (!fs.existsSync(reportDir)) {
          console.log('🔄 Creando carpeta de resultados...');
          fs.mkdirSync(reportDir);
        }

        const jsonGlob = path.join(reportDir, 'mochawesome_*.json');
        const mergedReport = path.join(reportDir, `report-${timestamp}.json`);
        const finalHtml = path.join(reportDir, `report-${timestamp}.html`);

        // Verifica si hay archivos JSON generados
        const jsonFiles = glob.sync(jsonGlob);
        console.log('Archivos JSON encontrados:', jsonFiles);

        if (jsonFiles.length === 0) {
          console.error('❌ No se encontraron archivos JSON generados.');
          return;
        }

        try {
          console.log('🔄 Fusionando archivos JSON...');
          // Fusiona los archivos JSON
          execSync(`npx mochawesome-merge ${jsonFiles.join(' ')} > "${mergedReport}"`, { stdio: 'inherit' });
          console.log(`Archivos JSON fusionados en: ${mergedReport}`);

          console.log('🔄 Generando el reporte HTML...');
          // Genera el HTML
          execSync(`npx marge "${mergedReport}" -f report -o "${reportDir}"`, { stdio: 'inherit' });
          console.log(`Reporte HTML generado en: ${finalHtml}`);

          // Abre el reporte en el navegador
          const open = require('open');  // Asegúrate de importar la librería correctamente
          open(finalHtml).then(() => {
            console.log(`✅ El reporte se ha abierto correctamente en el navegador.`);
          }).catch(err => {
            console.error('❌ No se pudo abrir el reporte en el navegador:', err);
          });
        } catch (error) {
          console.error('❌ Error generando el reporte HTML:', error.message);
        }
      });
    },

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Asegúrate de que tu ruta coincida con la de tus archivos de prueba
  },
});
