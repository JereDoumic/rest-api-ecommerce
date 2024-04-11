import { Router } from "express";
import {ProductController} from "../controllers/product-controller.js"



export const productsRouter = Router();

productsRouter.get("/", ProductController.getAll);
productsRouter.get("/:id", ProductController.getById);

productsRouter.post("/", ProductController.create);
productsRouter.delete("/:id", ProductController.delete);
productsRouter.patch("/:id", ProductController.update);




