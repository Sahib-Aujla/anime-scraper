
import express from "express";
import apiRouter from './api/index.js'

const router=express.Router();
router.use('/v1/anime',apiRouter);




export default router;