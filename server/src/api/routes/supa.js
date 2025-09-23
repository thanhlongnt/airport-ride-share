import express from "express";
import supabase from "../../config/supaConfig.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("smoothies")
        .select()
    if (error) {
        return res.status(500).send("Error fetching smoothies");
    }
    res.send(data);
});

export default router;