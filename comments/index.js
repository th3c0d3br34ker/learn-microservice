const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id: postId } = req.params;
  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { id: postId } = req.params;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  // emmit an event.
  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: { id: commentId, postId, content, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Received: ", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, postId, status } = data;

    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;

    // emmit an event.
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        ...data,
      },
    });
  }

  res.send({});
});

const PORT = 4002;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}...`);
});
