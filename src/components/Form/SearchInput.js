import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import "../../styles/Searchbar.css";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (keyword.length > 0) {
        try {
          const { data } = await axios.get(
            `/api/v1/product/search-suggestion/${keyword}`
          );
          setSuggestions(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSuggestions([]);
      }
    };

    console.log(suggestions.length);

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500); // Delay of 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion.name);
    setSuggestions([]);
    setValues({ ...values, keyword: suggestion.name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/v1/product/search/${keyword}`);
      setValues({ ...values, result: data });
      setKeyword("");
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="desktop-view">
        <form
          className="d-flex search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <input
            className="form-control me-2 form-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={keyword}
            onChange={handleInputChange}
          />
          <button className="search-button" type="submit">
            <IoSearch />
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={handleSubmit}
                className="suggestion-item"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mobile-view">
        <form
          className="d-flex search-form"
          role="search"
          onSubmit={handleSubmit}
        >
          <div className="search-toggle">
            <button
              className="search-button"
              type="button"
              onClick={toggleSearch}
            >
              <IoSearch />
            </button>
          </div>
          {showSearch && (
            <div className="search-input">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={keyword}
                onChange={handleInputChange}
              />
              <button className="search-button" type="submit">
                <IoSearch />
              </button>
            </div>
          )}
        </form>
        {showSearch && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion._id}
                onClick={handleSubmit}
                className="suggestion-item"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchInput;
