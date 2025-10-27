import { Router } from "express";
import { scheduleDelivery } from "../Controllers/delivery.controller";

const router = Router();

// POST: Schedule a delivery
router.post("/", scheduleDelivery);

export default router;
