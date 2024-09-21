const express = require('express')

const router = express.Router()
const userSignUpController = require('../controllers/userSignup')
const userSignInController = require('../controllers/userSignin')
const userDetailsController = require('../controllers/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controllers/userLogout')
const allUsers = require('../controllers/allUsers')
const updateUser = require('../controllers/updateUser')
const UploadProductController = require('../controllers/uploadProduct')
const getProductController = require('../controllers/getProduct')
const updateProductController = require('../controllers/updateProduct')
const getCategoryProductOne = require('../controllers/getCategoryProductOne')
const getCategoryWiseProduct = require('../controllers/getCategoryWiseProduct')
const getProductDetails = require('../controllers/getProductDetails')
const addToCartController = require('../controllers/addToCartController')
const countAddToCartProduct = require('../controllers/countAddToCartProduct')
const addToCartViewProduct = require('../controllers/addToCartViewProduct')
const updateAddToCartProduct = require('../controllers/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controllers/deleteAddToCartProduct')
const searchProduct = require('../controllers/searchProduct')
const filterProductController = require('../controllers/filterProduct')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)

//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProductOne)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router