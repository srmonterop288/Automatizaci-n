const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15); // Ej: 20250515T204500
const reportDir = path.resolve('results');
const mergedReport = path.join(reportDir, `merged-report-${timestamp}.json`);
const finalHtml = path.join(reportDir, `report-${timestamp}.html`);

// Asegura que la carpeta "results" exista
if (!fs.existsSync(reportDir)) {
  console.log('📁 La carpeta "results" no existe. Creándola...');
  fs.mkdirSync(reportDir, { recursive: true });
}

// Lista todos los archivos en la carpeta
const allFiles = fs.readdirSync(reportDir);
console.log('📂 Archivos dentro de "results":', allFiles);

// Usa una ruta compatible con glob (usando / para evitar problemas con Windows)
let jsonFiles = glob.sync(`${reportDir}/mochawesome*.json`);
console.log('🔎 Archivos JSON encontrados:', jsonFiles);

// Normaliza los paths para que funcionen en mochawesome-merge (usa /)
jsonFiles = jsonFiles.map(file => file.replace(/\\/g, '/'));

if (jsonFiles.length === 0) {
  console.error('❌ No se encontraron archivos JSON. Asegúrate de haber ejecutado pruebas primero.');
  process.exit(1);
}

try {
  console.log('🔄 Ejecutando mochawesome-merge...');
  const mergedJson = execSync(`npx mochawesome-merge ${jsonFiles.join(' ')}`, { encoding: 'utf-8' });
  fs.writeFileSync(mergedReport, mergedJson);
  console.log(`✅ Archivo fusionado creado: ${mergedReport}`);

  console.log('📊 Ejecutando marge para generar HTML...');
  execSync(`npx marge "${mergedReport}" -f "report-${timestamp}" -o "${reportDir}"`, { stdio: 'inherit' });

  console.log(`✅ Reporte HTML generado en: ${finalHtml}`);

  // Usa import() dinámico para cargar el módulo `open` y abre el archivo HTML
  (async () => {
    const { default: open } = await import('open');  // Desestructuración de la exportación por defecto
    open(finalHtml);  // Abre el reporte en el navegador
  })();

} catch (err) {
  console.error('❌ Error generando el reporte:', err.message);
}
