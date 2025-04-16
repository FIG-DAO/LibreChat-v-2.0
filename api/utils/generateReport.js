const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateMCPReport(logs, outputPath = './mcp-report.pdf') {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  doc.fontSize(20).text('🧠 Leo Platform: MCP Report', { underline: true });
  doc.moveDown();

  logs.forEach((log, i) => {
    doc.fontSize(12).text(`#${i + 1}`);
    doc.text(`User: ${log.user}`);
    doc.text(`Session: ${log.session}`);
    doc.text(`Action: ${log.action}`);
    doc.text(`Time: ${log.timestamp}`);
    doc.moveDown();
  });

  doc.end();
}

module.exports = generateMCPReport;
