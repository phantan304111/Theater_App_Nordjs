import React, { Fragment, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import YouTube from "react-youtube";
import { addId, addItemMovie } from "../storerage/storage";
import requests from "../storerage/storage";
import "../../index.css";
import useStore from "../storerage/useStore";
import classes from "./moviesDetail.module.css";
//thanh phan hien chi tiet phim, hien ra khi an vao mot phim trong lists
function MoviesDetail(props) {
  const [state, dispatch] = useStore();
  (addId());
  const pathImg = "https://image.tmdb.org/t/p/w500";
  const [data, setData] = useState();
  //ham an hien description khi an vao va an lai
  const handleHidden = () => {
    props.onClose(false);
  };
  (addItemMovie());
  ///// ham lay/hien detail phim
  const detailData = useCallback(async () => {
    const film_id = props.data.id
    console.log(film_id);
    // console.log(" movies detail: id--------------", props.data);
    try {
      const result = await fetch(
        `http://localhost:4000${requests.fetchtrailer}`,{
          method: "POST",
          body:JSON.stringify({ film_id }),
          headers:{
            'Content-Type': 'application/json'
          },
          mode: 'cors'
        }
      );
      // console.log(`http://localhost:4000/movie/${props.data.id}/videos?api_key=RYoOcWM4JW`);

      const list = await result.json();
      setData(list.results);
      if(!!list.message)
      console.log(list.message);
    } catch {
      throw Error("some thing went wrong here");
    }
  }, [props.data.id]);
  //
  useEffect(() => {
    detailData();
  }, [detailData]);
  const isNull = !!data;

  function Backdrop() {
    //phan video hien thi
    const video = {
      height: "400",
      width: "50%",
      playerVars: {
        autoplay: 0,
      },
    };
    //phan id
    const index = Math.floor(Math.random() * isNull && data.length - 1);
    if (state.addId[0] === state.addId[1]) {
      props.onClose(false);
      dispatch(addItemMovie(null));
    }
    const isCheck = isNull && data.length > 0;
    return (
      <div className="backdrop">
        {isCheck ? (
          <div className={classes.YouTube}>
            <YouTube videoId={data[index].key} opts={video} />
          </div>
        ) : (
          <div className={classes.imgnull}>
            <img
              src={`${pathImg}${props.data.poster_path}`}
              alt={props.data.name ? props.data.name : props.data.title}
            />
          </div>
        )}
        <div className={classes.container}>
          <div className={classes.title}>
            <h1>
              {  (props.data.name ? props.data.name : props.data.title)}
              <hr width="350" align="left" />
            </h1>
          </div>
          <div>
            <div className={classes.release}>
              <p>
                Release Date :
                {
                  (props.data.first_air_date
                    ? props.data.first_air_date
                    : props.data.release_date)}
              </p>
            </div>
            <div className={classes.vote}>
              <p> Vote :{Math.round (props.data.vote_average*10)/10} / 10</p>
            </div>

            <div className={classes.description}>
              <p> Description :{props.data.overview}</p>
            </div>
          </div>
          <div onClick={handleHidden} className={classes.x}>
            <h1>X</h1>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
    </Fragment>
  );
}
export default MoviesDetail;
