import { Schema, model, Types } from "mongoose";

interface IDocument {
  user: Types.ObjectId;

  originalName: string;
  mimeType: string;

  fileUrl: string;

  extractedText?: string;
}

const documentSchema = new Schema<IDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Document = model<IDocument>("Document", documentSchema);

export default Document;
