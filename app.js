const express = require("express");
const { generatePdfAndSendEmail } = require("./src/controllers/pdfcontroller.js");

const app = express();
app.use(express.json());

app.post("/api/generate-pdf", generatePdfAndSendEmail);

app.listen(3000, () => {
  console.log("PDF API running on http://localhost:3000");
});
