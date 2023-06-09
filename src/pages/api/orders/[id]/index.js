import { createRouter } from "next-connect";
import getByIdOrder from "@/backend/controllers/orders/getById";
import dbConnection from "@/backend/middleware/dbConnection";

const router = createRouter();

router.use(dbConnection).get(getByIdOrder);

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Something went wrong." });
  },
  onNoMatch: (err, req, res) => {
    console.error(err.message);
    res.status(404).json({ error: true, message: "Not found order." });
  },
});
