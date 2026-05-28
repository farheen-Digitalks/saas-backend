import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subscription"
    },

    orderId: {
        type: String
    },

    paymentId: {
        type: String
    },

    amount: {
        type: Number
    },

    currency: {
        type: String,
        default: "INR"
    },

    status: {
        type: String,
        enum: ["SUCCESS", "FAILED", "PENDING"],
        default: "PENDING"
    },

    paymentGateway: {
        type: String,
        default: "RAZORPAY"
    }

}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;