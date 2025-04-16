const { PDFDocument } = require("pdf-lib");
const fs = require("node:fs");

const generatePDF = async (formData) => {
  try {
    const templateBytes = fs.readFileSync("vineetha.pdf");
    const pdfDoc = await PDFDocument.load(templateBytes);
    const form = pdfDoc.getForm();

    form.getTextField("Text1").setText(formData.name || "");
    form.getTextField("Text2").setText(formData.dob || "");
    form.getTextField("Text3").setText(formData.email || "");
    form.getTextField("Text4").setText(formData.address || "");
    form.getTextField("Text5").setText(formData.education || "");

    form.flatten(); // Make the form read-only
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("PDF generation failed");
  }
};

module.exports = { generatePDF };
