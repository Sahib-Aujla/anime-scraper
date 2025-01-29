import express from 'express';
import getLatestAnime from './getRecentAnime.js';
import getSearchAnime from './getSearchAnime.js';

const router=express.Router();

router.get('/recent-releases',getLatestAnime);

router.get('/search',getSearchAnime);


export default router;