import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MovieDetails() {
  const [cast, setCast] = useState([]);
  const [movie, setMovie] = useState({});
  const [searchParams] = useSearchParams();
  const movie_id = searchParams.get("q");
  console.log(movie_id);
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";

  const fetchMovie = async (movie_id) => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
      );
      console.log(res.data);
      setMovie(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US

  const fetchMovieCast = async () => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
      );
      console.log(res.data.cast);
      setCast(res.data.cast);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(movie_id);
    fetchMovieCast();
  }, [movie_id]);

  return (
    <>
      <div className="container movieDetails">
        <div className="row s1">
          <div className="col-xl-6">
            <div className="row">
              <div className="col-xl-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-xl-9">
                <h3>{movie.title}</h3>
                <p>Rating:{movie.vote_average}</p>
                <p>{movie.runtime}mins</p>
                <p>
                  <div>
                    {movie.genres &&
                      movie.genres.length > 0 &&
                      movie.genres.map((genre) => genre.name).join(",")}
                  </div>
                </p>
                <div>
                  <h5>Overview</h5>
                  <p>{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
        <h2>Movie Cast</h2>
        <div className="row">
          {cast &&
            cast.length > 0 &&
            cast.map((cast) => {
              return (
                <div className="col-xl-2 cast1">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt=""
                    className="img-fluid"
                  />
                  <h4>{cast.name}</h4>
                  <p>{cast.character}</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
