import React, {useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assests/MovieFlixLogo.png'
import { useDispatch } from 'react-redux';
import { getSearchQuery } from '../store/slices/searchSlice';

export default function Header() {

  //Hooks 
  const title = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSearch = (e) => { 
    e.preventDefault();
    console.log(title.current.value);
    dispatch(getSearchQuery(title.current.value));
    navigate("/search");
    document.querySelector(".iBox").value = "";
  }
  
  return (
    <>
      <div className="bg-info-subtle bg-gradiend">
        <nav class="navbar navbar-expand-lg container">
          <div class="container-fluid">
            <Link class="navbar-brand" to="/">
              <img src={logo} alt="" width={104} />
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 menus">
                <li class="nav-item">
                  <Link class="nav-link active" to="/">
                    Popular
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link active" to="/top">
                    Top rated
                  </Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link active" to="/upcoming">
                    Upcoming
                  </Link>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input
                  class="form-control me-2 iBox"
                  type="search"
                  placeholder="movie name"
                  aria-label="Search"
                  ref={title}
                />
                <button
                  class="btn btn-outline-dark"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

