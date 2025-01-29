import getRecentAnime from "../../webscraper/getRecentAnime.js";
export default async function getLatestAnime(req, res) {
  try {
    const { page } = req.query;
    const animeList = await getRecentAnime(page);
    return res.status(200).json(animeList); 
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
