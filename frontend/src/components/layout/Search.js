import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Search = (history) => {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
