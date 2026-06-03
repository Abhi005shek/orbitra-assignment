import type { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { createDocument } from "../services/documentService";
import { extractText } from "../utils/extractText";
import { extractTravelData } from "../utils/extractTravelData";
import Itinerary from "../model/itinerary";
import { createItineraryService } from "../services/itineraryService";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const extractedText = await extractText(req.file);

    const aiOutput = await extractTravelData(extractedText);

    const fileUrl = await uploadToCloudinary(req.file.buffer);

    const document = await createDocument({
      user: req.user!._id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      fileUrl,
      extractedText,
    });

    const itinerary = {
      user: req.user!._id,
      title: aiOutput.title,
      destination: aiOutput.destination,
      startDate: aiOutput.startDate ? new Date(aiOutput.startDate) : undefined,
      endDate: aiOutput.endDate ? new Date(aiOutput.endDate) : undefined,
      content: aiOutput.content,
      extractedData: aiOutput.extractedData,
      document: document._id,
    };

    const itineraryData = await createItineraryService(itinerary);

    return res.status(201).json({
      success: true,
      message: "Itinerary automatically generated and stored successfully",
      data: itineraryData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
