import React, { Fragment, useState } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";
import { useHistory } from "react-router-dom";

const Search = () => {
  const History = useHistory();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {

      History.push(`/products/${keyword[0].toUpperCase()+keyword.substring(1).toLowerCase()}`);
    } else {
      History.push(`/products`);
    }
  };

  return (
    <Fragment>
      <MetaData title={`Search A Product -- NISHOSHOP`} />

      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword( e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
