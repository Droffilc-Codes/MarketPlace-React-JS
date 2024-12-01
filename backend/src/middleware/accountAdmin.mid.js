import { USER_UNAUTHORISED } from "../constants/httpStatus.js"
import authMid from "./auth.mid.js"

const deliveryAdminMid = (req, res, next) => {
    if (!req.user.isAccountsAdmin) res.status(USER_UNAUTHORISED).send()

    return next()
}

export default [authMid, deliveryAdminMid]