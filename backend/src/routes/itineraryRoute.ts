import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import {
  createItinerary,
  createShareLink,
  getUserItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
  getSharedItinerary,
} from "../controller/itineraryController";

const router = Router();

router
  .route("/")
  .post(authMiddleware, createItinerary)
  .get(authMiddleware, getUserItineraries);

router
  .route("/:id")
  .get(authMiddleware, getItineraryById)
  .patch(authMiddleware, updateItinerary)
  .delete(authMiddleware, deleteItinerary);

router.post("/:id/share", authMiddleware, createShareLink);

router.get("/share/:shareId", getSharedItinerary);

export default router;
