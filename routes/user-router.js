import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";



export const userRouter = Router();
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", UserController.getById);

userRouter.post("/", UserController.create);
userRouter.delete("/:id", UserController.delete);
userRouter.patch("/:id", UserController.update);
