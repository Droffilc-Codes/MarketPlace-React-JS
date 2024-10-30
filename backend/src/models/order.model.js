import { model, Schema } from 'mongoose';
import { OrderStatus } from '../constants/orderStatus.js';
import { GroceryModel } from './grocery.model.js';

export const LatLngSchema = new Schema(
    {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    },
    {
        _id: false,
    },
);

export const OrderItemSchema = new Schema(
    {
        grocery: { type: GroceryModel.schema, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    {
        _id: false
    }
);

OrderItemSchema.pre('validate', function (next) {
    this.price = this.grocery.price * this.quantity;
    next();
});

const OrderSchema = new Schema(
    {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
        addressLatLng: { type: LatLngSchema, required: true },
        paymentId: { type: String },
        subTotal: { type: Number, required: true, default: 0 },
        delivery: { type: Number, required: true, default: 0 },
        totalPrice: { type: Number, required: true },
        items: { type: [OrderItemSchema], required: true },
        status: { type: String, default: OrderStatus.NEW },
        user: { type: Schema.Types.ObjectId, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true
        }
    }
);

OrderSchema.pre('save', function (next) {
    // Calculate totalPrice before saving
    this.totalPrice = this.subTotal + this.delivery;
    next();
});

export const OrderModel = model('order', OrderSchema);
