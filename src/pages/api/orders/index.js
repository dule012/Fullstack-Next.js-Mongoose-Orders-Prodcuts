import { createRouter } from "next-connect";
import createOrder from "@/backend/controllers/orders/create";
import dbConnection from "@/backend/middleware/dbConnection";
import validation from "@/backend/middleware/validation";
import createOrderSchema from "@/backend/schemas/orders/create";

const router = createRouter();

router.use(dbConnection).post(validation(createOrderSchema), createOrder);

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Something went wrong." });
  },
});
