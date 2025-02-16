import { Router } from "express";
import { getUser , getUsers } from "../controllers/user.controller.js";
import authorize from "../middleware/auth.Middleware.js"

const userRouter = Router();

userRouter.get('/', getUsers );

userRouter.get('/:id', authorize,getUser);

userRouter.post('/', (req, res) => res.send({
    title: 'Create a user'
}));

userRouter.put('/:id', (req, res) => res.send({
    title: 'Update the user'
}));

userRouter.delete('/:id', (req, res) => res.send({
    title: 'Delete the user'
}));

export default userRouter;
