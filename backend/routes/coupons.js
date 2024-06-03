const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");

router.post("/", async (req, res) => {
  try {
    const {code} = req.body
    const existingCoupon = await Coupon.findOne({code})
    if(existingCoupon){
     return res.status(400).json({error: "Kod daha önce kullanılmış"})
    }
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon bulunamadı" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

// single kod cupon getirme
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({code : couponCode});
    if (!coupon) {
      return res.status(404).json({ error: "Kupon bulunamadı" });
    }
    
        const {discountPercent} = coupon;
    res.status(200).json({discountPercent});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
// kuponu güncelleme
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;
    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Cupon bulunamadı" });
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      couponId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
  // kuponu silme
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId );
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Kupon bulunamadı." });
    }

    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;
