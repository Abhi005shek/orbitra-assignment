import { type Request, type Response } from "express";

import {
  createItineraryService,
  getUserItinerariesService,
  getItineraryByIdService,
  updateItineraryService,
  deleteItineraryService,
  createShareLinkService,
  getSharedItineraryService,
} from "../services/itineraryService";

export const createItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = await createItineraryService({
      user: req.user!._id,
      ...req.body,
    });

    return res.status(201).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getUserItineraries = async (req: Request, res: Response) => {
  try {
    const itineraries = await getUserItinerariesService(req.user!._id);

    return res.status(200).json({
      success: true,
      data: itineraries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getItineraryById = async (req: Request, res: Response) => {
  try {
    const itinerary = await getItineraryByIdService(
      req.params.id as string,
      req.user!._id,
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const updateItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = await updateItineraryService(
      req.params.id as string,
      req.user!._id,
      req.body,
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const deleteItinerary = async (req: Request, res: Response) => {
  try {
    const itinerary = await deleteItineraryService(
      req.params.id as string,
      req.user!._id,
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Itinerary deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const createShareLink = async (req: Request, res: Response) => {
  try {
    const itinerary = await createShareLinkService(
      req.params.id as string,
      req.user!._id,
    );

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getSharedItinerary = async (req: Request, res: Response) => {
  try {
    const { shareId } = req.params;
    const itinerary = await getSharedItineraryService(shareId as string);

    if (!itinerary) {
      return res.status(404).json({
        success: false,
        message: "Itinerary not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: itinerary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
