import express from "express";
import multer from "multer";
import * as fileController from "../module/fileOps/fileOps.controller.js";

const router = express.Router();
const upload = multer();

router.post(
  "/convert",
  upload.single("file"),
  fileController.ConvertWordToPdfBuffer
);

router.post(
  "/replace-and-convert",
  upload.single("file"),
  fileController.ReplaceTextAndConvertToPdfBuffer
);

export { router as fileRouter };
