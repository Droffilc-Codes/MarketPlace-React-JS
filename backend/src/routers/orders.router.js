import { Router } from "express";
import handler from 'express-async-handler'
import auth from '../middleware/auth.mid.js'
import { BAD_REQUEST, USER_UNAUTHORISED } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import { UserModel } from "../models/user.model.js";

const router = Router()
router.use(auth)

router.post('/create', handler(async (req, res)=>{
    const order = req.body
    
    if (order.items.length <= 0 ) return res.status(BAD_REQUEST).send('Bag is Empty!')

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    })

    const newOrder = new OrderModel({ ...order, user: req.user.id})
    await newOrder.save()
    res.send(newOrder)
}))

router.put('/pay', handler(async (req, res)=>{
    const { paymentId } = req.body
    const order = await getNewOrderForCurrentUser(req)
    if (!order) {
        res.status(BAD_REQUEST).send('Order Not Found!')
        return
    }

    order.paymentId = paymentId
    order.status = OrderStatus.PAYED
    await order.save()

    res.send(order._id)
}))


router.get('/track/:orderId', handler(async (req, res) => {
    const { orderId } = req.params;

    const user = await UserModel.findById(req.user.id);

    const filter = {
        _id: orderId,
    };

    if (!user.isAdmin) {
        filter.user = user._id;
    }

    const order = await OrderModel.findOne(filter);
    
    if (!order) {
        return res.status(400).send(USER_UNAUTHORISED);  
    }

    return res.send(order);  
}));


router.get('/newOrderForCurrentUser', handler(async (req, res)=>{
    const order = await getNewOrderForCurrentUser(req)
   
    if (order) res.send(order)
        else res.status(BAD_REQUEST).send("Order not Found")
}))


router.get('/allStatus', handler(async (req, res)=>{
    const allStatus = Object.values(OrderStatus)
    res.send(allStatus)
}))



router.get('/:status?', handler(async (req, res)=>{
    const status  = req.params.status
    const user = await UserModel.findById(req.user.id)
    const filter = {}

    if (!user.isAdmin) filter.user = user._id
    if (status) filter.status = status 

    // console.log(filter)
    const orders = await OrderModel.find(filter).sort('-createdAt')
    res.send(orders)
}))

const getNewOrderForCurrentUser = async req => 
    await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW})

export default router