import { getAnimeListByGenre } from "../../webscraper/getGenre.js";

export default async function getAnimeByGenre(req, res) {
  try {
    const { id } = req.params;
    const animeList = await getAnimeListByGenre(id);
    return res.status(200).json(animeList);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
