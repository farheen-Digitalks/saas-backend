import { createPlan, deletePlan, getPlanById, getPlans, updatePlan } from "../services/plan.js";

export const createPlanHandler = async (req, res) => {

    try {

        const plan = await createPlan(req.body);

        return res.status(201).json({
            success: true,
            data: plan
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPlansHandler = async (req, res) => {

    try {

        const plans = await getPlans();

        return res.status(200).json({
            success: true,
            data: plans
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getPlanByIdHandler = async (req, res) => {

    try {

        const plan = await getPlanById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: plan
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updatePlanHandler = async (req, res) => {

    try {

        const plan = await updatePlan(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            data: plan
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deletePlanHandler = async (req, res) => {

    try {

        const plan = await deletePlan(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: plan
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};