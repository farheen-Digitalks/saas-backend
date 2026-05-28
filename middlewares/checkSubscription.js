import subscription from "../models/subscription.js";

const checkSubscription = async (req, res, next) => {

    try {

        const subscription = await subscription.findOne({
            companyId: req.user.companyId,
            status: "ACTIVE",
            paymentStatus: "PAID"
        });

        if (!subscription) {
            return res.status(403).json({
                success: false,
                message: "No active subscription"
            });
        }

        if (new Date(subscription.endDate) < new Date()) {
            return res.status(403).json({
                success: false,
                message: "Subscription expired"
            });
        }

                req.subscription = subscription;

        next();

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default checkSubscription;