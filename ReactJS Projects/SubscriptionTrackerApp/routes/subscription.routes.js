import { Router } from "express";
import authorize from "../middleware/auth.Middleware.js";
import { createSubscription, getSubscriptionDetails, getUserSubscriptions, getAllSubscriptions } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/' , authorize, getAllSubscriptions)

subscriptionRouter.get('/:id' , authorize, getSubscriptionDetails)

subscriptionRouter.post('/' , authorize, createSubscription);

subscriptionRouter.put('/:id' , (req,res)=> res.send({title : "Update a Subscription"}))

subscriptionRouter.delete('/' , (req,res)=> res.send({title : "delete a Subscription"}))

subscriptionRouter.get('/user/:id' , authorize , getUserSubscriptions)

subscriptionRouter.put('/:id/cancel' , (req,res)=> res.send({title : "Cancel a Subscription"}))

subscriptionRouter.get('/upcoming-renewals' , (req,res)=> res.send({title : "get upcoming renewals"}))


export default subscriptionRouter;