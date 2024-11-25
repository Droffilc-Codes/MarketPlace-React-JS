import {model, Schema } from 'mongoose'

export const AccountSchema = new Schema(
    {
        shopName: {type: String, required: true},
        totalAmount: {type: Number, required: true},
        date: {type: Date, required: true},
        isApproved: {type: Boolean, default: false},
    },
    {
        timestamps: true
    }
)

AccountSchema.index({ shopName: 1, date: 1}, { unique: true })
export const AccountModel = model('Account', AccountSchema)