import { activateSubscription, createSubscription, getCompanySubscription } from "../services/subscription.js";

export const createSubscriptionHandler =
    async (req, res) => {

        try {

            const subscription =
                await createSubscription(
                    req.body.companyId,
                    req.body.planId
                );

            return res.status(201).json({
                success: true,
                data: subscription
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

export const getCompanySubscriptionHandler =
    async (req, res) => {

        try {

            const subscription =
                await getCompanySubscription(
                    req.params.companyId
                );

            return res.status(200).json({
                success: true,
                data: subscription
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };

export const activateSubscriptionHandler =
    async (req, res) => {

        try {

            const subscription =
                await activateSubscription(
                    req.params.id
                );

            return res.status(200).json({
                success: true,
                data: subscription
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };