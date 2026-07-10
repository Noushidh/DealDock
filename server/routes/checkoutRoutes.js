import express from "express"
import { checkout } from "../controllers/checkoutController.js"
import { protect } from "../middleware/ProtectingRoutes.js"

const router = express.Router()

router.post('/checkout',checkout)

export default router