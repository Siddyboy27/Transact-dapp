import { useEffect,useState } from "react";
const API_KEY=import.meta.env.VITE_GIPHY_API;

const useFetch=({keyword})=>{
    const [gifURL,setGifURl]=useState("");
    const query=keyword.split(" ").join("");
    console.log(query);
    const fetchGifs=async()=>{
        try {
            const res=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=1`);
            const {data}=await res.json();

            setGifURl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            console.log(error);
            setGifURl("https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif")
        }
    }

    useEffect(()=>{
        if(keyword)fetchGifs();
    },[keyword]);

    return gifURL;
}

export default useFetch;