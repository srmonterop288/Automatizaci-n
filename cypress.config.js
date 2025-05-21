// Cargar las variables del archivo ".env" al objeto process.env
require("dotenv").config();

const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const { execSync } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const XLSX = require("xlsx");
const path = require("path");

// Validar que se haya definido el ambiente en .env
const ambienteRaw = process.env.CYPRESS_AMBIENTE;
if (!ambienteRaw) {
  throw new Error(
    "No se definió la variable 'CYPRESS_AMBIENTE' en el archivo .env."
  );
}

const ambiente = ambienteRaw.toUpperCase();

if (!["QA", "STG"].includes(ambiente)) {
  throw new Error(`Ambiente '${ambiente}' no es válido. Usa 'QA' o 'STG'.`);
}

// Obtener la URL base correspondiente al ambiente
const baseUrl = process.env[`CY_${ambiente}_URL`];

if (!baseUrl) {
  throw new Error(
    `No se encontró la URL para el ambiente '${ambiente}' en el archivo .env.`
  );
}

const timestamp = dayjs().format("YYYYMMDD_HHmmss"); // Timestamp para nombre único

module.exports = defineConfig({
  env: { ...process.env }, // Carga todas las variables del archivo .env
  e2e: {
    baseUrl,

    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "mochawesome, mocha-junit-reporter",
      mochawesomeReporterOptions: {
        reportDir: "results",
        overwrite: false,
        html: false,
        json: true,
      },
      mochaJunitReporterReporterOptions: {
        mochaFile: `results/test-results-${timestamp}.xml`,
        toConsole: false,
      },
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Asegúrate de que tu ruta coincida con la de tus archivos de prueba
    setupNodeEvents(on, config) {
      on("after:run", (results) => {
        console.log("🎯 Evento after:run disparado.");
        // Asegúrate de que la carpeta 'results' exista
        const reportDir = path.join(__dirname, "results");
        if (!fs.existsSync(reportDir)) {
          console.log("🔄 Creando carpeta de resultados...");
          fs.mkdirSync(reportDir);
        }

        const jsonGlob = path.join(reportDir, "mochawesome_*.json");
        const mergedReport = path.join(reportDir, `report-${timestamp}.json`);
        const finalHtml = path.join(reportDir, `report-${timestamp}.html`);

        // Verifica si hay archivos JSON generados
        const jsonFiles = glob.sync(jsonGlob);
        console.log("Archivos JSON encontrados:", jsonFiles);

        if (jsonFiles.length === 0) {
          console.error("❌ No se encontraron archivos JSON generados.");
          return;
        }

        try {
          console.log("🔄 Fusionando archivos JSON...");
          // Fusiona los archivos JSON
          execSync(
            `npx mochawesome-merge ${jsonFiles.join(" ")} > "${mergedReport}"`,
            { stdio: "inherit" }
          );
          console.log(`Archivos JSON fusionados en: ${mergedReport}`);

          console.log("🔄 Generando el reporte HTML...");
          // Genera el HTML
          execSync(`npx marge "${mergedReport}" -f report -o "${reportDir}"`, {
            stdio: "inherit",
          });
          console.log(`Reporte HTML generado en: ${finalHtml}`);

          // Abre el reporte en el navegador
          const open = require("open"); // Asegúrate de importar la librería correctamente
          open(finalHtml)
            .then(() => {
              console.log(
                `✅ El reporte se ha abierto correctamente en el navegador.`
              );
            })
            .catch((err) => {
              console.error(
                "❌ No se pudo abrir el reporte en el navegador:",
                err
              );
            });
        } catch (error) {
          console.error("❌ Error generando el reporte HTML:", error.message);
        }
      });

      on("task", {
        leerExcel({ archivo, hoja }) {
          const ruta = path.resolve(__dirname, archivo);
          const wb = XLSX.readFile(ruta);
          const datos = XLSX.utils.sheet_to_json(wb.Sheets[hoja]);
          return datos;
        },
      });
    },
  },
});
