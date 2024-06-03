import React from "react";
import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map((article) => (
        <div className="article-preview" key={article.id}>
          <Link to={`/article/${article.id}`}>
            <h2>{article.title}</h2>
            <p>Written by {article.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
