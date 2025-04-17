const { generatePDF } = require("../services/pdfService.js");
const { sendEmail } = require("../services/emailService.js");
const fs = require("node:fs");

async function generatePdfAndSendEmail(req, res) {
  try {
    const formData = req.body;
    const pdfBuffer = await generatePDF(formData);
    const emailSent = await sendEmail(formData.email, pdfBuffer);

    if (emailSent) {
      console.log("PDF generated and email sent successfully.");
      res.setHeader("Content-Type", "application/pdf");
      res.send(pdfBuffer);
    } else {
      res.status(500).json({ message: "Failed to send email." ,pdf: pdfBytes});
    }
  } catch (error) {
    console.error("Error generating PDF or sending email:", error);
    res.status(500).json({ message: "Failed to generate PDF or send email." });
  }
};
 async function generateURLAndSendEmail (req, res) {
  try {
    const formData = req.body;
    const pdfBuffer = await generatePDF(formData);
    const emailSent = await sendEmail(formData.email, pdfBuffer);

    const fileName = `${formData.email.split('@')[0]}.pdf`;
    const filePath = `generated/${fileName}`;
    fs.writeFileSync(filePath, pdfBuffer);
    const downloadUrl = `http://localhost:3000/user-pdfs/${fileName}`;

    if (emailSent) {
      console.log("PDF generated and email sent successfully.");
      res.json({
        message: "PDF generated successfully",
        url: downloadUrl,
      });
    } else {
      res.status(500).json({ message: "Failed to send email." ,pdf: pdfBuffer});
    }
  } catch (error) {
    console.error("Error generating PDF or sending email:", error);
    res.status(500).json({ message: "Failed to generate PDF or send email." });
  }
};

module.exports = { generatePdfAndSendEmail, generateURLAndSendEmail };

