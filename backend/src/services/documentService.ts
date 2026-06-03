import { Types } from "mongoose";
import Document from "../model/document";

export const createDocument = async (data: {
  user: Types.ObjectId;
  originalName: string;
  mimeType: string;
  fileUrl: string;
  extractedText?: string;
  extractedData?: Record<string, any>;
}) => {
  return await Document.create(data);
};
