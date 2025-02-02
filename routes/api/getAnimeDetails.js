import getAnimeInfo from "../../webscraper/getAnimeDetails";

export default async function getAnimeDetails(req, res) {
  try {
    const { id } = req;
    const animeInfo = getAnimeInfo(id);
    return res.status(200).json(animeInfo);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
