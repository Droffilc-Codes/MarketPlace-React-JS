import {model, Schema } from 'mongoose'

export const GrocerySchema = new Schema(
    {
        location: {type: String, required: true},
        market: {type: String, required: true},
        shop: {type: String, required: true},
        name: {type: String, required: true},
        favourite: {type: Boolean, default: false},
        stars: {type: Number, default: 3},
        imageUrl: {type: String, required: true},
        tags: {type: [String], required: true},
        price: {type: Number, required: true},
        stock: {type: Number, required: true},
        otherInformation: {type: String, required: true}
    },
    {
        timestamps: true,
        toJSON:{
            virtuals: true
        },
        toObject: {
            virtuals:  true
        }
    }
)

export const GroceryModel = model('Grocery', GrocerySchema)