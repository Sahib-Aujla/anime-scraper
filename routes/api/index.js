import express from "express";
import getLatestAnime from "./getRecentAnime.js";
import getSearchAnime from "./getSearchAnime.js";
import getAnimeDetails from "./getAnimeDetails.js";
import getEpisodeInfo from "./getEpisodeInfo.js";
import getGenresList from "./getGenreList.js";

const router = express.Router();

router.get("/recent-releases", getLatestAnime);

router.get("/search", getSearchAnime);

router.get("/get/:id", getAnimeDetails);

router.get("/get/episode/:id", getEpisodeInfo);

router.get('/get/genre',getGenresList);

export default router;
