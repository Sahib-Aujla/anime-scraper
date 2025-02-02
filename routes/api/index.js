import express from "express";
import getLatestAnime from "./getRecentAnime.js";
import getSearchAnime from "./getSearchAnime.js";
import getAnimeDetails from "./getAnimeDetails.js";

const router = express.Router();

router.get("/recent-releases", getLatestAnime);

router.get("/search", getSearchAnime);

router.get("/get/:id", getAnimeDetails);

export default router;
