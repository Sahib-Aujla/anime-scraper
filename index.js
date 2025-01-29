import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
const app = express();
app.use(cors());


app.get('/v1/',apiRoutes);