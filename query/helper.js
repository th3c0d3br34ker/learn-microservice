const posts = {
  "81bdc2f9": {
    id: "81bdc2f9",
    title: "Test Post 1",
    comments: [],
  },
  c00c01b2: {
    id: "c00c01b2",
    title: "Test Post 2",
    comments: [],
  },
  c0sc01b2: {
    id: "c0sc01b2",
    title: "Test Post 3",
    comments: [],
  },
};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const { comments } = posts[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.content = content;
    comment.status = status;
  }
};

module.exports = {
  posts,
  handleEvent,
};
