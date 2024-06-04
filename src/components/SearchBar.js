import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const handleSearch = () => {
    const encodedAuthor = encodeURIComponent(author);
    const encodedTitle = encodeURIComponent(title);
    const encodedTags = tags.map((tag) => encodeURIComponent(tag)).join(",");
    const searchUrl = `/results/search?author=${encodedAuthor}&title=${encodedTitle}&tags=${encodedTags}`;
    window.location.href = searchUrl;
  };

  return (
    <form className="search-bar-container" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags"
        value={tags.join(",")}
        onChange={(e) => setTags(e.target.value.split(","))}
      />
      <button onClick={handleSearch} type="button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
