const express = require("express")
const router = express.Router()


const productRouter = require("./products.js")
const categoryRouter = require("./categories.js")
const authRouter = require("./auth.js")
const couponRoute = require("./coupons.js")
const userRoute = require("./users.js")
const paymentRoute = require("./payment.js")


router.use("/categories" , categoryRouter)
router.use("/products" , productRouter)
router.use("/auth" , authRouter)
router.use("/coupons" , couponRoute)
router.use("/users" , userRoute )
router.use("/payment" , paymentRoute )




module.exports=router