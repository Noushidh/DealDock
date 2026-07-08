import express from "express"
import upload from "../middleware/upload.js"
import { AddProduct } from "../controllers/productController.js"

const router = express.Router()

router.post('/addProduct',upload.single("image"),AddProduct)

export default router