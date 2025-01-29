import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const base_url = process.env.BASE_URL;

export default async function searchAnime(keyword) {
  try {
    const res = [];

    const response = await axios.get(
      `${base_url}/search.html?keyword=${keyword}`
    );
    const $ = cheerio.load(response.data);

    const items = $("div.last_episodes ul.items li");

    items.each((index, element) => {
      const $el = $(element);

      const link = $el.find("div.img a").attr("href") || "";
      const title = $el.find("div.img a").attr("title") || "";
      const image = $el.find("div.img a img").attr("src") || "";
      const animeName = $el.find("p.name a").text().trim();
      const released = $el.find("p.released").text().trim();

      res.push({
        link,
        title,
        image,
        animeName,
        released,
      });
    });

    return res;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return [];
  }
}

console.log(await searchAnime("solo"));
