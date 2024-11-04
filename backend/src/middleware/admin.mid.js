import { USER_UNAUTHORISED } from "../constants/httpStatus.js"
import authMid from "./auth.mid.js"

const adminMid = (req, res, next) => {
    if (!req.user.isAdmin) res.status(USER_UNAUTHORISED).send()

    return next()
}

export default [authMid, adminMid]