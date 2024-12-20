import { Router } from "express";
import jwt from 'jsonwebtoken'
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
const PASSWORD_HASH_SALT_ROUNDS = 10
import authMid from "../middleware/auth.mid.js";
import admin from "../middleware/admin.mid.js";

const router = Router()

router.post('/login', handler(async (req, res)=>{
    const { email, password} = req.body
    const user = await UserModel.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.send(generateTokenResponse(user))
        return
    }

    res.status(BAD_REQUEST).send('Username or Password is Invalid')
}))

router.post('/register', handler(async (req, res)=>{
    const { name, email, password, phone, address } = req.body 

    const user = await UserModel.findOne({email})

    if(user){
        res.status(BAD_REQUEST).send('User already exists, please login!')
        return
    }

    const hashedPassword =  await bcrypt.hash(password, PASSWORD_HASH_SALT_ROUNDS)

    const newUser = {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        phone,
        address
    }

    const result = await UserModel.create(newUser)

    res.send(generateTokenResponse(result))

}))

router.put('/updateUserProfile', authMid, handler(async (req, res)=>{
    const { name, address, phone } = req.body
    const user = await UserModel.findByIdAndUpdate( req.user.id, {name, address, phone}, { new: true})

    res.send(generateTokenResponse(user))

}) )


router.put('/updateUserPassword', authMid, handler(async (req, res)=>{
    const { currentPassword, newPassword } = req.body
    const user = await UserModel.findById(req.user.id)

    if (!user) {
        res.send(BAD_REQUEST).send('Password Update Failed!')
        return
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password)

    if (!passwordMatch) {
        res.send(BAD_REQUEST).send("Current Password is Not Correct!")
        return
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS)
    await user.save()

    res.send()

}))

router.get('/getAllUsers/:searchTerm?', admin, handler(async (req, res)=>{
    const {searchTerm} = req.params

    const filter = searchTerm ?
        {name: {$regex: new RegExp(searchTerm, 'i')}}
        : {}
   const users = await UserModel.find(filter, {password : 0})
   res.send(users)
}))


router.put('/toggleBlock/:userId', admin, handler(async(req, res)=>{
    const {userId} = req.params

    if(userId === req.user.id){
        res.status(BAD_REQUEST).send("Can't Block yourself!")
        return
    }

    const user = await UserModel.findById(userId)
    user.isBlocked = !user.isBlocked

    user.save()

    res.send(user.isBlocked)
}))

router.get('/getUserById/:userId', admin, handler(async(req, res)=>{
    const {userId} = req.params

    
    const user = await UserModel.findById(userId, {password: 0})

    res.send(user)
}))

router.put('/updateUser', admin, handler(async (req, res)=>{
    const { id, name, email, phone, address, isAdmin, isDeliveryAdmin, isAccountsAdmin, isDataAdmin } = req.body //isDeliveryAdmin added 11/13/24

    await UserModel.findByIdAndUpdate(id, {name, email, phone, address, isAdmin, isDeliveryAdmin, isAccountsAdmin, isDataAdmin})

    res.send()
}))


const generateTokenResponse = user => {
    
    const token = jwt.sign({
        id: user.id, 
        email: user.email, 
        isAdmin: user.isAdmin,
        isDeliveryAdmin: user.isDeliveryAdmin,
        isAccountsAdmin: user.isAccountsAdmin, 
        isDataAdmin: user.isDataAdmin,
    }, process.env.JWT_SECRET,
    {
        expiresIn: '30d',
    }

    )
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        isAdmin: user.isAdmin,
        isDeliveryAdmin: user.isDeliveryAdmin, // addition
        isAccountsAdmin: user.isAccountsAdmin, // addition
        isDataAdmin: user.isDataAdmin, // addition
        token,
    }
}

export default router