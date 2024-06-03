import React, { useState } from "react";

const AddComment = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    onSubmit({ content });
    setContent("");
  };

  return (
    <div className="add-comment-container">
      <form className="add-comment-form" onSubmit={handleSubmit}>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default AddComment;
