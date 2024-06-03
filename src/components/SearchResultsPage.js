import React from "react";
import { useLocation } from "react-router-dom";
import useFetch from "./data/useFetch";
import ArticleList from "./ArticleList";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const author = queryParams.get("author");
  const title = queryParams.get("title");
  const tags = queryParams.getAll("tags");

  let url = "https://ras02-eas-14.azuremicroservices.io/article/search?";
  if (author && author.trim() !== "") {
    url += `author=${encodeURIComponent(author)}`;
  }
  if (title && title.trim() !== "") {
    url += `${author ? "&" : ""}title=${encodeURIComponent(title)}`;
  }
  if (tags.length > 0) {
    const encodedTags = tags.map((tag) => encodeURIComponent(tag)).join(",");
    url += `${author || title ? "&" : ""}tags=${encodedTags}`;
  }

  const { data: searchData, error, isPending } = useFetch(url);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.response && error.response.status === 403) {
      return <div className="search-results">No results found.</div>;
    } else {
      return <div>No results found.</div>;
    }
  }

  if (
    !searchData ||
    !searchData.dtos ||
    !Array.isArray(searchData.dtos) ||
    searchData.dtos.length === 0
  ) {
    return <div className="search-results">No results found.</div>;
  }

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ArticleList articles={searchData.dtos} />
    </div>
  );
};

export default SearchResultsPage;
