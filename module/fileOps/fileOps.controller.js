import * as fileService from "./fileOps.service.js";

export async function ConvertWordToPdfBuffer(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const pdfBuffer = await fileService.ConvertWordToPdfBuffer(req.file.buffer);
    console.log("pdfBuffer ", pdfBuffer);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function ReplaceTextAndConvertToPdfBuffer(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!req.body.data) {
      return res.status(400).json({ error: "Missing replacement data" });
    }

    const pdfBuffer = await fileService.ReplaceTextAndConvertToPdfBuffer(
      req.file.buffer,
      JSON.parse(req.body.data)
    );

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
