const { generatePDF } = require("../services/pdfService.js");
const { sendEmail } = require("../services/emailService.js");

const generatePdfAndSendEmail = async (req, res) => {
  try {
    const formData = req.body;
    const pdfBuffer = await generatePDF(formData);
    const emailSent = await sendEmail(formData.email, pdfBuffer);

    if (emailSent) {
      console.log("PDF generated and email sent successfully.");
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=generated.pdf");
      res.send(pdfBuffer);
    } else {
      res.status(500).json({ message: "Failed to send email." ,pdf: pdfBytes});
    }
  } catch (error) {
    console.error("Error generating PDF or sending email:", error);
    res.status(500).json({ message: "Failed to generate PDF or send email." });
  }
};

const generateURLAndSendEmail = async (req, res) => {
  try {
    const formData = req.body;
    const pdfBuffer = await generatePDF(formData);
    const emailSent = await sendEmail(formData.email, pdfBuffer);

    const fileName = `${formData.name.replace(/\s+/g, "_")}_${formData.email.split('@')[0]}.pdf`;
    const filePath = `generated/${fileName}`;
    fs.writeFileSync(filePath, pdfBytes);
    const downloadUrl = `http://localhost:3000/user-pdfs/${fileName}`;

    if (emailSent) {
      console.log("PDF generated and email sent successfully.");
      res.json({
        message: "PDF generated successfully",
        url: downloadUrl,
      });
    } else {
      res.status(500).json({ message: "Failed to send email." ,pdf: pdfBytes});
    }
  } catch (error) {
    console.error("Error generating PDF or sending email:", error);
    res.status(500).json({ message: "Failed to generate PDF or send email." });
  }
};

module.exports = { generatePdfAndSendEmail, generateURLAndSendEmail };

