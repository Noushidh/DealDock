import express from "express"
import upload from "../middleware/upload.js"
import * as Product from "../controllers/productController.js"

const router = express.Router()

router.get('/products',Product.fetchProducts)
router.post('/addProduct',upload.array("images",10),Product.AddProduct)
router.patch('/editProduct/:id',upload.array("images",10),Product.EditProduct)

export default router