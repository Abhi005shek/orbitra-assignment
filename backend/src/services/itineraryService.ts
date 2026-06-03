import crypto from "crypto";

import Itinerary from "../model/itinerary";
import { Schema, Types } from "mongoose";
import Document from "../model/document";
import cloudinary from "../config/cloudinary";

export const createItineraryService = async (data: {
  title: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  content: string;
  extractedData: Record<string, any>;
}) => {
  return await Itinerary.create({
    ...data,
  });
};

export const getUserItinerariesService = async (userId: Types.ObjectId) => {
  return await Itinerary.find({
    user: userId,
  })
    .populate("document")
    .sort({
      createdAt: -1,
    });
};

export const getItineraryByIdService = async (
  itineraryId: string | Types.ObjectId,
  userId: Types.ObjectId,
) => {
  return await Itinerary.findOne({
    _id: itineraryId,
    user: userId,
  }).populate("document");
};

export const updateItineraryService = async (
  itineraryId: string | Types.ObjectId,
  userId: Types.ObjectId,
  updateData: {
    title?: string;
    destination?: string;
    startDate?: Date;
    endDate?: Date;
    content?: string;
  },
) => {
  return await Itinerary.findOneAndUpdate(
    {
      _id: itineraryId,
      user: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );
};

export const deleteItineraryService = async (
  itineraryId: string | Types.ObjectId,
  userId: Types.ObjectId,
) => {
  const itinerary = await Itinerary.findOneAndDelete({
    _id: itineraryId,
    user: userId,
  });
  if (!itinerary) {
    return null;
  }

  if (itinerary.document) {
    const doc = await Document.findById(itinerary.document);

    if (doc && doc.fileUrl) {
      try {
        const urlParts = doc.fileUrl.split("/");
        const fileNameWithExt = urlParts[urlParts.length - 1];
        const folderName = urlParts[urlParts.length - 2];
        const publicId = `${folderName}/${fileNameWithExt.split(".")[0]}`;

        const resourceType =
          doc.mimeType === "application/pdf" ? "raw" : "image";
        await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType,
        });
      } catch (cloudinaryErr) {
        console.error("Cloudinary Purge Failed:", cloudinaryErr);
      }
    }

    await Document.deleteOne({ _id: itinerary.document });
  }

  return await Itinerary.deleteOne({ _id: itineraryId, user: userId });
};

export const createShareLinkService = async (
  itineraryId: Types.ObjectId | string,
  userId: Types.ObjectId,
) => {
  const existingItinerary = await Itinerary.findOne({
    _id: itineraryId,
    user: userId,
  });
  if (!existingItinerary) return null;

  if (existingItinerary.shareId) {
    return existingItinerary;
  }
  const shareId = crypto.randomBytes(8).toString("hex");

  return await Itinerary.findOneAndUpdate(
    {
      _id: itineraryId,
      user: userId,
    },
    {
      shareId,
    },
    {
      new: true,
    },
  );
};

export const getSharedItineraryService = async (shareId: string) => {
  return await Itinerary.findOne({
    shareId,
  })
    .populate("document")
    .select("-user");
};
