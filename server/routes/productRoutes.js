import express from "express"
import upload from "../middleware/upload.js"
import * as Product from "../controllers/productController.js"
import { protect } from "../middleware/ProtectingRoutes.js"

const router = express.Router()

router.get('/products',Product.fetchProducts)
router.post('/addProduct',protect,upload.array("images",10),Product.AddProduct)
router.patch('/editProduct/:id',protect,upload.array("images",10),Product.EditProduct)
router.delete('/deleteProduct/:id',protect,Product.DeleteProduct)

export default router