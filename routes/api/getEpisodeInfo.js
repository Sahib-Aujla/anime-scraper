import getAnimeEpisodeInfo from "../../webscraper/getAnimeEpisodeInfo.js";

export default async function getEpisodeInfo(req, res) {
  try {
    const { id } = req.params;
    const episodeInfo = await getAnimeEpisodeInfo(id);
    return res.status(200).json(episodeInfo);
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
}
