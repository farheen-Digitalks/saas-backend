export const createPaymentOrder = async (req, res) => {

    try {

        const data = await paymentService.createOrder({
            companyId: req.user.companyId,
            planId: req.body.planId
            
        });

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};