import React, { useState } from "react";

const EditComment = ({ comment, onUpdate }) => {
  const [content, setContent] = useState(comment.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...comment, // передаємо всі дані коментаря
      content: content, // оновлюємо текст коментаря
    });
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="edit-comment">
      <form onSubmit={handleSubmit}>
        <textarea value={content} onChange={handleChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditComment;
