import { createRouter } from "next-connect";
import getProducts from "@/backend/controllers/orders/get";
import dbConnection from "@/backend/middleware/dbConnection";

const router = createRouter();

router.use(dbConnection).get(getProducts);

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Something went wrong." });
  },
});
