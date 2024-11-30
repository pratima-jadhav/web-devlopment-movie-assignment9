import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Search=() => {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    const movie_name = useSelector((state) => state.search.value);
    console.log(movie_name);
    
    const Api_key = "c45a857c193f6302f2b5061c3b85e743";

    const fetchSearchMovies = async () => {
        try {
            let res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${movie_name}&page=1`);
            console.log(res.data.results);
            setMovies(res.data.results);
        } catch (err) {
            console.log(err);
        }
    };

    const handleMovie = (id) => {
      console.log(id);
      navigate(`/movie?q=${id}`);
    };

    useEffect(() => {
        fetchSearchMovies();
    });
    
    return (
        <>
            <div className="container mb-5 mt-5">
          <h2 className="heading">Search Movies</h2>
            <div className="row mb-3 mt-3">
                {movies &&
                    movies.length > 0 &&
                    movies.map((movie) => {
                        return (
                          <div
                            className="col-xl-3 text-center p-3 single"
                            onClick={() => handleMovie(movie.id)}
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              alt=""
                              className="img-fluid"
                            />
                            <h4>{movie.title}</h4>
                            <p>
                              Rating : <strong>{movie.vote_average}</strong>
                            </p>
                          </div>
                        );
                    })}
                </div>
                </div>
        </>
    );
}
