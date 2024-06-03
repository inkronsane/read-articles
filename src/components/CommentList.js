import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import EditComment from "./EditComment";

const CommentList = ({ comments }) => {
  const { isLoggedIn, uid } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editCommentId, setEditCommentId] = useState(null);
  const handleDeleteComment = (commentId) => {
    const token = Cookies.get("jwt");

    fetch(
      `https://ras02-eas-14.azuremicroservices.io/comments/delete/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then(() => {
      navigate("/");
    });
  };

  const handleUpdateComment = (commentId, content) => {
    const token = Cookies.get("jwt");

    fetch(
      `https://ras02-eas-14.azuremicroservices.io/comments/update/${commentId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dto: { content: content.content } }), // Передаємо лише значення контенту
      }
    )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
  };

  const handleEditComment = (commentId) => {
    setEditCommentId(commentId);
  };

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <div className="comment-preview" key={comment.id}>
          {editCommentId === comment.id ? (
            <EditComment
              comment={comment}
              onUpdate={(updatedData) =>
                handleUpdateComment(comment.id, updatedData)
              }
            />
          ) : (
            <>
              <h2>{comment.content}</h2>
              <p>
                Written by{" "}
                <Link to={`/users/${comment.authorId}`}>
                  {comment.authorId}
                </Link>
              </p>
              {isLoggedIn && comment.authorId === uid && (
                <>
                  <button onClick={() => handleEditComment(comment.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    Delete
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
