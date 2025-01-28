import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const base_url = process.env.BASE_URL;

async function getRecentReleases() {
  try {
    const response = await axios.get(`${base_url}/home.html?page=3`);
    const $ = cheerio.load(response.data);

    const items = $("div.last_episodes.loaddub ul.items li");

    items.each((index, element) => {
      const $el = $(element);

      const link = $el.find("div.img a").attr("href") || "";

      const title = $el.find("div.img a").attr("title") || "";

      const image = $el.find("div.img a img").attr("src") || "";

      const animeName = $el.find("p.name a").text().trim();

      const episode = $el.find("p.episode").text().trim();

      console.log({
        link,
        title,
        image,
        animeName,
        episode,
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

getAnimeData();
