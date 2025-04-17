const express = require("express");
const {  generateURLAndSendEmail } = require("./src/controllers/pdfcontroller.js");

const app = express();
app.use(express.json());

app.use("/user-pdfs", express.static("generated"));
app.post("/api/generate-url", generateURLAndSendEmail);

app.listen(3000, () => {
  console.log("PDF API running on http://localhost:3000");
});


