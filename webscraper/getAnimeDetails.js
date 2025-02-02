import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import dotenv from "dotenv";

dotenv.config();
const base_url = process.env.BASE_URL;

export default async function getAnimeDetails(animeName) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new", 
    });

    const page = await browser.newPage();

    
    const url = `${base_url}/category/${animeName}`;
    await page.goto(url, {
      waitUntil: "networkidle2", 
    });

   
    await page.waitForSelector("div#load_ep ul#episode_related li", {
      timeout: 1000,
    });

    const html = await page.content();

    const $ = cheerio.load(html);

    const infoContainer = $(".anime_info_body_bg");

    // 1) Title
    const title = infoContainer.find("h1").text().trim();

    // 2) Image (cover)
    const image = infoContainer.find("img").attr("src") || "";

    // 3) Description
    const description = infoContainer.find("div.description").text().trim();

    // 4) Type
    let type = "";
    const typeEl = infoContainer.find('p.type:contains("Type") a');
    if (typeEl.length) {
      type = typeEl.first().text().trim();
    }

    // 5) Genre
    const genre = [];
    infoContainer.find('p.type:contains("Genre") a').each((_, el) => {
      genre.push($(el).text().trim());
    });

    // 6) Released
    let released = "";
    const releasedText = infoContainer
      .find('p.type:contains("Released")')
      .text();
    if (releasedText) {
      released = releasedText.replace(/Released:\s*/i, "").trim();
    }

    // 7) Status
    const status = infoContainer
      .find('p.type:contains("Status") a')
      .text()
      .trim();

    // 8) Other Names
    const otherNames = [];
    infoContainer.find("p.type.other-name a").each((_, el) => {
      otherNames.push($(el).text().trim());
    });

    // 9) Episodes
    const episodes = [];
    $("div#load_ep ul#episode_related li").each((_, el) => {
      const $el = $(el);
      const link = $el.find("a").attr("href")?.trim() || "";

      const epNumText = $el.find(".name").text().replace(/EP\s*/i, "").trim();

      // Sub or Dub in <div class="cate">
      const subOrDub = $el.find(".cate").text().trim();

      episodes.push({
        episodeNum: epNumText,
        link,
        type: subOrDub,
      });
    });

    return {
      title,
      image,
      description,
      type,
      genre,
      released,
      status,
      otherNames,
      episodes,
    };
  } catch (error) {
    console.error("Puppeteer error fetching anime details:", error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Test call

// console.log(
//   await getAnimeDetailsPuppeteer(
//     "shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-to-su"
//   )
// );
