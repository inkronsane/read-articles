import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./data/useFetch";
import CommentList from "./CommentList";
import Pagination from "./Pagination";
import { AuthContext } from "./AuthContext";
import EditArticle from "./EditArticle";
import AddComment from "./AddComment";
import Cookies from "js-cookie";

const ArticleDetails = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: comments,
    isPending: commentsPending,
    error: commentsError,
    refetch: refetchComments,
  } = useFetch(
    `https://ras02-eas-14.azuremicroservices.io/comments/search?articleId=${id}&page=${currentPage}`
  );
  const {
    data: articleData,
    error: articleError,
    isPending: articlePending,
  } = useFetch(`https://ras02-eas-14.azuremicroservices.io/article/a/${id}`);
  const navigate = useNavigate();
  const { isLoggedIn, uid } = useContext(AuthContext);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArticleDelete = () => {
    fetch(`https://ras02-eas-14.azuremicroservices.io/article/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      navigate("/");
    });
  };

  const handleArticleUpdate = (updatedArticle) => {
    const token = Cookies.get("jwt");

    fetch(`https://ras02-eas-14.azuremicroservices.io/article/update`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dto: updatedArticle }),
    })
      .then(() => {
        setIsEditing(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating article:", error);
      });
  };

  const handleCommentSubmit = (comment) => {
    const token = Cookies.get("jwt");

    fetch(`https://ras02-eas-14.azuremicroservices.io/comments/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dto: {
          articleId: id,
          content: comment.content,
        },
      }),
    })
      .then(() => {
        refetchComments();
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  return (
    <div className="article-details">
      {articlePending && <div>Loading article...</div>}
      {articleError && <div>{articleError}</div>}
      {articleData && (
        <article>
          {isEditing ? (
            <EditArticle
              article={articleData.dto}
              onUpdate={handleArticleUpdate}
            />
          ) : (
            <>
              <h2>{articleData.dto.title}</h2>
              <p>Written by {articleData.dto.author}</p>
              <p>Tags: {articleData.dto.tags.join(", ")}</p>{" "}
              {/* Display tags here */}
              <div>{articleData.dto.content}</div>
              {isLoggedIn && articleData.dto.authorId === uid && (
                <>
                  <button onClick={() => setIsEditing(true)}>
                    Edit Article
                  </button>
                  <button onClick={handleArticleDelete}>Delete Article</button>
                </>
              )}
            </>
          )}
        </article>
      )}
      {commentsPending && <div>Loading comments...</div>}
      {commentsError && <div>{commentsError}</div>}
      {comments && (
        <div>
          <h2>Add a Comment</h2>
          <AddComment onSubmit={handleCommentSubmit} />
          <CommentList comments={comments.dtos} />
          <Pagination
            currentPage={currentPage}
            totalPages={comments.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
