// import { verify } from 'jsonwebtoken'
import pkg from 'jsonwebtoken';
const { verify } = pkg;

import { USER_UNAUTHORISED } from '../constants/httpStatus.js' 

export default (req, res, next) =>{
    const token = req.headers.access_token
    if (!token) return res.status(USER_UNAUTHORISED).send()


    try{
        const decoded = verify(token, process.env.JWT_SECRET)
        req.user = decoded

    }catch(error){
        res.status(USER_UNAUTHORISED).send()

    }

    return next()
}