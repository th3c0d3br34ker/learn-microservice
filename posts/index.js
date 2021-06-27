const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const posts = {
  "81bdc2f9": {
    id: "81bdc2f9",
    title: "Test Post 1",
  },
  c00c01b2: {
    id: "c00c01b2",
    title: "Test Post 2",
  },
  c0sc01b2: {
    id: "c0sc01b2",
    title: "Test Post 3",
  },
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  const newPost = {
    id,
    title,
  };

  posts[id] = newPost;

  // emmit an event.
  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: newPost,
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Received: ", req.body.type);
  res.send({});
});

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
