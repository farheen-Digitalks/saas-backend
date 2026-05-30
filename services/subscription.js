import Plan from "../models/plans.js";
import Subscription from "../models/subscription.js";

export const createSubscription = async (
    companyId,
    planId
) => {

    const plan = await Plan.findById(planId);

    if (!plan) {
        throw new Error("Plan not found");
    }

    const endDate = new Date();

    endDate.setDate(
        endDate.getDate() +
        plan.durationInDays
    );

    return await Subscription.create({
        companyId,
        planId,
        amount: plan.price,
        modules: plan.modules,
        endDate
    });
};

export const getCompanySubscription = async (
    companyId
) => {

    return await Subscription
        .findOne({
            companyId
        })
        .populate("planId");
};

export const activateSubscription = async (
    subscriptionId
) => {

    return await Subscription.findByIdAndUpdate(
        subscriptionId,
        {
            status: "active",
            paymentStatus: "paid"
        },
        {
            new: true
        }
    );
};