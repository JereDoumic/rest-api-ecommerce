import express, {json} from "express";
import { productsRouter } from "./routes/product-router.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { categoryRouter } from "./routes/category-router.js";
import { userRouter } from "./routes/user-router.js";

const app = express();

app.use(json());
app.use(corsMiddleware());

const PORT = process.env.PORT ?? 1234;

app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log("App listen PORT: ", PORT);
})

