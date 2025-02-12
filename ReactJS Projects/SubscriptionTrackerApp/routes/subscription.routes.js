import { Router } from "express";

const subscriptionRouter = Router();


subscriptionRouter.get('/' , (req,res)=> res.send({title : "get all Subscription"}))

subscriptionRouter.get('/:id' , (req,res)=> res.send({title : "get Subscription details"}))

subscriptionRouter.post('/' , (req,res)=> res.send({title : "Create a Subscription"}))

subscriptionRouter.put('/:id' , (req,res)=> res.send({title : "Update a Subscription"}))

subscriptionRouter.delete('/' , (req,res)=> res.send({title : "delete a Subscription"}))

subscriptionRouter.get('/user/:id' , (req,res)=> res.send({title : "get all user Subscription"}))

subscriptionRouter.put('/:id/cancel' , (req,res)=> res.send({title : "Cancel a Subscription"}))

subscriptionRouter.get('/upcoming-renewals' , (req,res)=> res.send({title : "get upcoming renewals"}))


export default subscriptionRouter;