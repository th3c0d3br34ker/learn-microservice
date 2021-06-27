const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { posts, handleEvent } = require("./helper");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("Event Received:", type);

  handleEvent(type, data);

  res.send({});
});

const PORT = 4003;

app.listen(PORT, async () => {
  console.log(`Listening on PORT ${PORT}...`);

  const response = await axios.get("http://event-bus-srv:4005/events");

  console.log("Events to process:", response.data.length);

  for (let event of response.data) {
    const { type, data } = event;

    console.log("Processing event:", type);

    handleEvent(type, data);
  }
  console.log("All events processed!");
});
