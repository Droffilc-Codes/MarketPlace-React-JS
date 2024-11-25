import { Router } from "express";
import handler from 'express-async-handler'
import { AccountModel } from "../models/account.model.js";
import admin from "../middleware/admin.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";


const router = Router()

router.post('/createPayment', admin, handler(async(req, res)=>{
    console.log('Route hit:', req.body);
    const { shopName, totalAmount, date} = req.body
    try{
        const result = await AccountModel.findOneAndUpdate(
            { shopName, date },
            { $set: { totalAmount } },
            { upsert: true, new: true}
        )
        res.status(200).json({ success: true, payment: result });
    } catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: 'Error saving payment.' });
    }
   
}))



router.get('/getPayments', admin, handler(async (req, res) => {
    // Work
    const allPayments = await AccountModel.find()
       
    if (!allPayments) {
        return res.status(400).send(USER_UNAUTHORISED);  
    }

    return res.send(allPayments);  
}));

router.put('/updateAccounts', admin, handler(async(req, res)=>{
    const {paymentID} = req.body
    console.log(paymentID)

    if (!paymentID){
        res.status(BAD_REQUEST).send("Payment Not Found!")
        return
    }

    const payInfo = await AccountModel.findById(paymentID)
    payInfo.isApproved = true
    await payInfo.save()

    res.send()
}))

export default router