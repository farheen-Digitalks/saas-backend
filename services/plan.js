import Plan from "../models/plans.js";

export const createPlan = async (body) => {

    const existingPlan = await Plan.findOne({
        name: body.name
    });

    if (existingPlan) {
        throw new Error("Plan already exists");
    }

    return await Plan.create(body);
};

export const getPlans = async () => {
    return await Plan.find({
        isActive: true
    });
};

export const getPlanById = async (id) => {
    return await Plan.findById(id);
};

export const updatePlan = async (id, body) => {

    return await Plan.findByIdAndUpdate(
        id,
        body,
        {
            new: true
        }
    );
};

export const deletePlan = async (id) => {

    return await Plan.findByIdAndUpdate(
        id,
        {
            isActive: false
        },
        {
            new: true
        }
    );
};