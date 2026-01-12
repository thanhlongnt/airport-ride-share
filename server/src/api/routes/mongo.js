import express from "express";
import supabase from "../../config/mongoDBConfig.js";
import dbConfig from "../../config/mongoDBConfig.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let db = dbConfig.getDB();
    res.send('yay');
});

router.get("/close", async (req, res) => {
    dbConfig.closeDB();
    res.send('close');
});

export default router;