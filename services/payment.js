import razorpay from "../config/razorPay.js";
import Payment from "../models/payment";
import Plan from "../models/plans.js";
import subscription from "../models/subscription.js";
import crypto from "crypto";

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

const verifyPayment = async ({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
}) => {

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new Error("Invalid payment signature");
    }

    const payment = await Payment.findOne({
        orderId: razorpay_order_id
    });

    if (!payment) {
        throw new Error("Payment not found");
    }

    payment.paymentId = razorpay_payment_id;
    payment.status = "SUCCESS";

    await payment.save();

    const subscription = await Subscription.findById(
        payment.subscriptionId
    ).populate("planId");

    subscription.status = "ACTIVE";
    subscription.paymentStatus = "PAID";

    const endDate = new Date();

    endDate.setDate(
        endDate.getDate() + subscription.planId.durationInDays
    );

    subscription.endDate = endDate;

    await subscription.save();

    return payment;
};
