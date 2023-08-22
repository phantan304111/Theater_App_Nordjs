import { useContext } from "react";
import { createContext } from "react";


import {
  actionMovies_Type,
  ADD_ID,
  ADD_ITEM,
  ComodyMovies_TYPE,
  DocumentMovies_TYPE,
  HorrorMovies_TYPE,
  RomanceMovies_TYPE,
  SEARCH_TYPE,
  topRankMovied_TYPE,
  TrendingMovie_TYPE,
} from "./type";

export const Context = createContext(null)

//gan api va key vao cac muc can fetch
const API_KEY = "8qlOkxz4wq";/// API key cua user 1 trong back end
export const requests = {
  
  fetchTrending: `/${API_KEY}/movies/trending`,
  fetchNetflixOriginals: `/${API_KEY}/movies/discover?with_genres=Action`,
  fetchTopRated: `/${API_KEY}/movies/top-rate`,
  fetchActionMovies: `/${API_KEY}/movies/discover?with_genres=Action`,
  fetchComedyMovies: `/${API_KEY}/movies/discover?with_genres=Comedy`,
  fetchHorrorMovies: `/${API_KEY}/movies/discover?with_genres=Horror `,
  fetchRomanceMovies: `/${API_KEY}/movies/discover?with_genres=Romance`,
  fetchDocumentaries: `/${API_KEY}/movies/discover?with_genres=Documentary`,
  fetchtrailer: `/${API_KEY}/movies/videos`,
  fetchSearch: `/${API_KEY}/movies/search`,

};
////link api du lieu chinh
const BASEURL = "http://localhost:4000";
// const OldURL = "https://api.themoviedb.org/3";


// cac hanh dong cua trang, them id, fetch api du lieu
export const addItemMovie = (payload) => {
  return {
    type: ADD_ITEM,
    payload,
  };
};
export const addId = (payload) => {
  return {
    type: ADD_ID,
    payload,
  };
};

///// cac ham fetch API theo the loai
///fetch get trending request toi backend
export const getTrending = async () => {
  try {
    
    const result = await fetch(`${BASEURL}${requests.fetchTrending}`);
    const list = await result.json();
    const data = list.results;

    // console.log(data);

    return {
      type: TrendingMovie_TYPE,
      payload: data,
    };

  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
///fetch get top-rate request toi backend

export const getTopRanked = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchTopRated}`);
    const list = await result.json();
    const data = list.results;
    return {
      type: topRankMovied_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
///fetch get discover cac the loai toi backend

export const getActionMovie = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchActionMovies}`);
    const list = await result.json();
    const data = list.results;

    return {
      type: actionMovies_Type,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
export const getComedy = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchComedyMovies}`);
    const list = await result.json();
    const data = list.results;
    return {
      type: ComodyMovies_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
export const getHorror = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchHorrorMovies}`);
    const list = await result.json();
    const data = list.results;
    return {
      type: HorrorMovies_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
export const getRomance = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchRomanceMovies}`);
    const list = await result.json();
    const data = list.results;
    return {
      type: RomanceMovies_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
export const getDocument = async () => {
  try {
    const result = await fetch(`${BASEURL}${requests.fetchDocumentaries}`);
    const list = await result.json();
    const data = list.results;
    return {
      type: DocumentMovies_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
///fetch post trailer nam tai browser/moviesDetails
///fet post search den backend
///get search 
export const getSearch = async (keywords) => {
  try {
    const result = await fetch(
    
      //fetch post den backend voi keywords trong body
      //`http://localhost:4000/8qlOkxz4wq/movies/search //// body:JSON.stringify({ 12 }),
      `${BASEURL}${requests.fetchSearch}`,{
        method: "POST",
        body:JSON.stringify({ keywords }),
        headers:{
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    const list = await result.json();
    const data = list.results;
    return {
      type: SEARCH_TYPE,
      payload: data,
    };
  } catch (error) {
    throw new Error("something went wrong");
  }
};
function SHS_B(e, sc, eAmt, start, y) {
  e.scrollLeft = eAmt * sc + start;
}
///ham cuon list phai trai
export function smootHorizontalScrolling(e, time, amount, start) {
  var CurTime = 0;
  var eAmt = amount / 100;
  var scrollCounter = 0;
  const y = window.scrollY;
  while (CurTime <= 100) {
    window.setTimeout(SHS_B, CurTime, e, scrollCounter, eAmt, start, y);
    CurTime += time / 100;
    scrollCounter++;
  }
}

export const useStore = () => {
  const [state, dispatch] = useContext(Context);
  return [state, dispatch];
};
// export default useStore;
export default requests;
