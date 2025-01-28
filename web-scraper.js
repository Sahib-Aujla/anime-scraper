import * as cheerio from 'cheerio';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const base_url=process.env.BASE_URL;

async function getAnimeData(){
    const res=await axios.get( `${base_url}/home.html`);
    console.log(res)
    const $ = cheerio.load(res);
    //console.log($)
}


getAnimeData();