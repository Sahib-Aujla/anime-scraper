import express from 'express';
import getLatestAnime from './getRecentAnime.js';

const router=express.Router();

router.get('/anime/recent-releases',getLatestAnime);


export default router;