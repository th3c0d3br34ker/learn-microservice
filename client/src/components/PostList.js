import { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const response = await axios.get("http://posts.com/posts");

    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map(({ id, title, comments }) => {
    return (
      <div
        key={id}
        style={{ width: "30%", marginBottom: "20px" }}
        className="card"
      >
        <div className="card-body">
          <h3>{title}</h3>
          <CommentList comments={comments} />
          <CommentCreate postId={id} />
        </div>
      </div>
    );
  });

  return (
    <div className="container d-flex flex-row flex-wrap justify-content-between">
      {loading ? <div className="spinner" /> : <>{renderedPosts}</>}
    </div>
  );
};

export default PostList;
