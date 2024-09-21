const addToCartModel = require("../models/cartProduct")
const productModel = require("../models/productModel")


const deleteAddToCartProduct = async (req,res) =>{
    try {
        const currentUserId = req.userId  // from the middleware authToken
        const productId = req.body._id 

        const deleteProduct = await addToCartModel.deleteOne({_id : productId})

        res.status(200).json({
            message : "Product deleted successfully",
            error : false,
            success : true,
            data : deleteProduct
        })
    } catch (err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = deleteAddToCartProduct