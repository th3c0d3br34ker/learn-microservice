import axios from "axios";
import { useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title) return;
    setLoading(true);

    try {
      await axios.post("http://posts.com/posts/create", {
        title,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    setLoading(false);
    setTitle("");
  };

  const loadingButton = (
    <button class="btn btn-primary m-2" type="button" disabled>
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      <span className="m-2">Loading...</span>
    </button>
  );

  const button = (
    <button
      className="btn btn-primary m-2"
      type="submit"
      onClick={handleSubmit}
    >
      Create a Post
    </button>
  );

  return (
    <div className="container">
      <form className="form-group" onSubmit={handleSubmit}>
        <label className="m-2">Title</label>
        <input
          className="form-control m-2"
          value={title}
          onChange={handleChange}
        />
        {loading ? loadingButton : button}
      </form>
    </div>
  );
};

export default PostCreate;
