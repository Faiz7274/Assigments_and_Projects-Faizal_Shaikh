import Subscription from "../models/subscriptions.model.js"

export const createSubscription = async(req,res,next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })

        res.status(201).json({success: true, data: subscription});
    }

    catch(error)
    {
        next(error);
    }
}

export const getUserSubscriptions = async(req,res,next) => {
    try{
     if(req.user.id !== req.params.id)
     {
        const error = new Error('You are the Owner, Hacker Detected');
        error.status = 401;
        throw error;
     }
      
     const subscriptions = await Subscription.find({user: req.params.id});

     res.status(200).json({success: true, data: subscriptions});
    }

    catch(error)
    {
        next(error);
    }
} 

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();

        res.status(200).json({ success: true, data: subscriptions });
    } 
    
    catch (error) 
    {
        next(error);
    }
};

export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ _id: req.params.id, user: req.user._id });

        if (!subscription) {
            const error = new Error('Subscription not found or unauthorized');
            error.status = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: subscription });
    } 
    catch (error) 
    {
        next(error);
    }
};
