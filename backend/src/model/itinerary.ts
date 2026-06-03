import { Schema, model, Types } from "mongoose";

export interface IItinerary {
  user: Types.ObjectId;

  title: string;
  destination: string;

  startDate?: Date;
  endDate?: Date;

  content: string;
  extractedData: Schema.Types.Mixed;
  document: Types.ObjectId;

  shareId?: string;
}

const itinerarySchema = new Schema<IItinerary>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    content: {
      type: String,
      required: true,
    },

    extractedData: {
      type: Schema.Types.Mixed,
    },

    document: {
      type: Schema.Types.ObjectId,
      ref: "Document",
    },

    shareId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  },
);

const Itinerary = model<IItinerary>("Itinerary", itinerarySchema);
export default Itinerary;
