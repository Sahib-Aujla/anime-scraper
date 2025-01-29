import searchAnime from "../../webscraper/searchAnime";


export default async function(req,res){
    try{
        const {keyword}=req.query;
        const animeList=await searchAnime(keyword);
        return res.status(200).json(animeList);
    }catch(e){
        return res.status(500).json({message:'Server Error'});
    }
}