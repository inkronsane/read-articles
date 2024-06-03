import React, { useState } from "react";

const EditArticle = ({ article, onUpdate }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...article, // Передаємо всі дані артикулу
      title: title, // Оновлюємо заголовок артикулу
      content: content, // Оновлюємо текст артикулу
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="edit-article">
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
        <label>Content:</label>
        <textarea value={content} onChange={handleContentChange} required />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditArticle;
