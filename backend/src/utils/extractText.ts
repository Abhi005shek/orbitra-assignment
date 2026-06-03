const { PDFParse } = require("pdf-parse");
import Tesseract from "tesseract.js";

export const extractText = async (
  file: Express.Multer.File,
): Promise<string> => {
  const mimeType = file.mimetype;

  if (mimeType === "application/pdf") {
    const pdfData = await new PDFParse({ data: file.buffer });
    const result = await pdfData.getText();
    return result.text.trim();
  }

  
  if (mimeType.startsWith("image/")) {
    const result = await Tesseract.recognize(file.buffer, "eng");

    return result.data.text.trim();
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
};
