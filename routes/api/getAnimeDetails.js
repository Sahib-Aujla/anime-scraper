import getAnimeInfo from "../../webscraper/getAnimeDetails.js";

export default async function getAnimeDetails(req, res) {
  try {
    const { id } = req.params;
    console.log({id})
    const animeInfo = await getAnimeInfo(id);
    return res.status(200).json(animeInfo);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
