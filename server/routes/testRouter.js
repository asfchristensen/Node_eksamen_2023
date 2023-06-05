import { Router } from "express";
const router = Router();

router.get("/api/test/:color", (req, res) => {
    res.send({ message: req.params.color });
});


export default router;