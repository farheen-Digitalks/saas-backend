import razorpay from "../config/razorPay.js";
import Payment from "../models/payment";
import Plan from "../models/plans.js";
import subscription from "../models/subscription.js";

export const createOrder = async ({ companyId, planId }) => {

    const plan = await Plan.findById(planId);

    if (!plan) {
        throw new Error("Plan not found");
    }

    const amount = plan.price * 100;

    const options = {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    const subscription = await subscription.create({
        companyId,
        planId,
        amount: plan.price,
        modules: plan.modules,
        status: "PENDING"
    });

    await Payment.create({
        companyId,
        subscriptionId: subscription._id,
        orderId: order.id,
        amount: plan.price,
        status: "PENDING"
    });

    return {
        order,
        subscription
    };
};