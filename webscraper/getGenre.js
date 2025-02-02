import * as cheerio from "cheerio";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const genres = {
  Action: "action",
  "Adult Cast": "adult-cast",
  Adventure: "adventure",
  Anthropomorphic: "anthropomorphic",
  "Avant Garde": "avant-garde",
  "Award Winning": "award-winning",
  Cars: "cars",
  CGDCT: "cgdct",
  Childcare: "childcare",
  "Combat Sports": "combat-sports",
  Comedy: "comedy",
  Comic: "comic",
  Crime: "crime",
  Cultivation: "cultivation",
  Delinquents: "delinquents",
  Dementia: "dementia",
  Demons: "demons",
  Detective: "detective",
  Drama: "drama",
  Dub: "dub",
  Ecchi: "ecchi",
  Educational: "educational",
  Erotica: "erotica",
  Family: "family",
  Fantasy: "fantasy",
  "Gag Humor": "gag-humor",
  Game: "game",
  "Gender Bender": "gender-bender",
  Gore: "gore",
  Gourmet: "gourmet",
  Harem: "harem",
  Hentai: "hentai",
  "High Stakes Game": "high-stakes-game",
  Historical: "historical",
  Horror: "horror",
  "Idols (Female)": "idols-female",
  Isekai: "isekai",
  Iyashikei: "iyashikei",
  Josei: "josei",
  Kids: "kids",
  "Love Polygon": "love-polygon",
  Magic: "magic",
  "Magical Sex Shift": "magical-sex-shift",
  "Mahou Shoujo": "mahou-shoujo",
  "Martial Arts": "martial-arts",
  Mecha: "mecha",
  Medical: "medical",
  Military: "military",
  Music: "music",
  Mystery: "mystery",
  Mythology: "mythology",
  "Organized Crime": "organized-crime",
  "Otaku Culture": "otaku-culture",
  Parody: "parody",
  "Performing Arts": "performing-arts",
  Pets: "pets",
  Police: "police",
  Psychological: "psychological",
  Racing: "racing",
  Reincarnation: "reincarnation",
  "Reverse Harem": "reverse-harem",
  Romance: "romance",
  "Romantic Subtext": "romantic-subtext",
  Samurai: "samurai",
  School: "school",
  "Sci-Fi": "sci-fi",
  Seinen: "seinen",
  Shoujo: "shoujo",
  "Shoujo Ai": "shoujo-ai",
  Shounen: "shounen",
  Showbiz: "showbiz",
  "Slice of Life": "slice-of-life",
  Space: "space",
  Sports: "sports",
  "Strategy Game": "strategy-game",
  "Strong Male Lead": "strong-male-lead",
  "Super Power": "super-power",
  Supernatural: "supernatural",
  Survival: "survival",
  Suspense: "suspense",
  System: "system",
  "Team Sports": "team-sports",
  Thriller: "thriller",
  "Time Travel": "time-travel",
  "Urban Fantasy": "urban-fantasy",
  Vampire: "vampire",
  "Video Game": "video-game",
  Villain: "villain",
  "Visual Arts": "visual-arts",
  "Work Life": "work-life",
  Workplace: "workplace",
};

export function getGenreList() {
  return Object.keys(genres);
}

export function getGenreLink(name) {
  if (genres[name]) {
    return genres[name];
  }

  for (const [genreKey, genreValue] of Object.entries(genres)) {
    if (genreValue === name) {
      return genreValue;
    }
  }

  return null;
}

const base_url = process.env.BASE_URL;
export async function getAnimeListByGenre(genre) {
  try {
    // 1) Get the genre link from the dictionary
    const genrePath = getGenreLink(genre);
    if (!genrePath) {
      throw new Error(`Invalid genre: ${genre}, ${genrePath}`);
    }

    // 2) Fetch the page
    const url = `${base_url}/genre/${genrePath}`;
    const response = await axios.get(url);

    // 3) Load HTML into Cheerio
    const $ = cheerio.load(response.data);

    // 4) Parse the anime list in `.last_episodes ul.items li`
    const results = [];
    $(".last_episodes ul.items li").each((_, el) => {
      // The clickable link & image are inside ".img a"
      const $linkTag = $(el).find(".img a");
      const animeHref = $linkTag.attr("href") || "";
      const animeTitle = $linkTag.attr("title") || "";
      const animeImage = $linkTag.find("img").attr("src") || "";

      // The release year is in <p class="released">Released: 2024</p>
      let releasedText = $(el).find("p.released").text().trim();
      // Strip out "Released: " if present
      releasedText = releasedText.replace(/Released:\s*/i, "").trim();

      results.push({
        title: animeTitle,
        link: animeHref,
        image: animeImage,
        released: releasedText,
      });
    });

    return results;
  } catch (error) {
    console.error("Error fetching anime by genre:", error);
    return [];
  }
}
