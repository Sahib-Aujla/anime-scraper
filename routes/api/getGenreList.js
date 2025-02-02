import { getGenreList } from "../../webscraper/getGenre.js";


export default async function getGenresList(req, res) {
    try {
        const genresList = getGenreList();
        return res.status(200).json(genresList);
    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }

}