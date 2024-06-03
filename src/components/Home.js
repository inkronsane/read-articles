import React, { useState, useEffect } from "react";
import useFetch from "./data/useFetch";
import ArticleList from "./ArticleList";
import Pagination from "./Pagination";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const {
    data: articles,
    isPending,
    error,
  } = useFetch(
    `https://ras02-eas-14.azuremicroservices.io/getAll?page=${currentPage}`
  );

  useEffect(() => {
    if (articles && articles.totalPages) {
      setTotalPages(articles.totalPages);
    }
  }, [articles]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Home">
      <h2>Articles</h2>
      <ArticleList articles={articles.dtos} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
