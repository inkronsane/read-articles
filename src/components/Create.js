import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt");
    fetch("https://ras02-eas-14.azuremicroservices.io/article/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dto: { title, content, tags: tags.split(",") } }),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="create">
      <h2>Add a New Article</h2>
      <form onSubmit={handleSubmit}>
        <label>Article title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Article content:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Enter tags separated by commas"
        />
        <button>Add Article</button>
      </form>
    </div>
  );
};

export default Create;
