import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import dotenv from "dotenv";
dotenv.config();

const base_url = process.env.BASE_URL;

async function scrapeAnimeEpisodePage(episodeTag) {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    await page.goto(`${base_url}/${episodeTag}`, {
      waitUntil: "domcontentloaded",
      timeout: 0,
    });

    await page.waitForSelector(".anime_muti_link ul li", { timeout: 10000 });

    const html = await page.content();
    const $ = cheerio.load(html);

    const rawTitle = $("div.anime_name.anime_video .title_name h2")
      .text()
      .trim();

    const episodeRegex = /Episode\s+(\d+)/i;
    const episodeMatch = rawTitle.match(episodeRegex);
    const episodeNumber = episodeMatch ? episodeMatch[1] : "";

    let animeTitle = rawTitle;
    if (episodeNumber) {
      animeTitle = rawTitle.split(`Episode ${episodeNumber}`)[0].trim();
    }

    const category = $(".anime_video_body_cate a").first().text().trim();

    const servers = [];
    $(".anime_muti_link ul li").each((_, el) => {
      const $li = $(el);
      const $link = $li.find("a");

     
      const serverName = $link
        .text()
        .replace(/Choose this server/i, "")
        .trim();

      const videoUrl = $link.attr("data-video") || "";

      // The "rel" attribute might store a server ID or type
      const relId = $link.attr("rel") || "";

      servers.push({
        serverName,
        videoUrl,
        relId,
      });
    });

    const episodes = [];
    $("#load_ep ul#episode_related li").each((_, el) => {
      const $li = $(el);
      const $link = $li.find("a");

      // Episode link (relative URL)
      const href = ($link.attr("href") || "").trim();
      const epName = $link.find(".name").text().trim(); // "EP 7"
      const epNum = epName.replace(/[^0-9]/g, ""); 

      const subOrDub = $link.find(".cate").text().trim();

      episodes.push({
        episodeNumber: epNum,
        link: href,
        type: subOrDub,
      });
    });

    return {
      rawTitle,
      animeTitle,
      episodeNumber,
      category,
      servers,
      episodes,
    };
  } catch (err) {
    console.error("Error scraping anime episode page:", err);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

console.log(
  await scrapeAnimeEpisodePage(
    "shangri-la-frontier-kusoge-hunter-kamige-ni-idoman-to-su-2nd-season-episode-6"
  )
);
