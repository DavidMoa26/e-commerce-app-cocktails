import asyncHandler from 'express-async-handler'
import Order from "../models/orderModel.js";

export const addOrderItems = () => asyncHandler(async (res, req) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
        res.statusCode(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.statusCode(201).json(createdOrder)
    }


})
