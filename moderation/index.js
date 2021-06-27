const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { content } = data;

    const status = content.includes("badword") ? "rejected" : "approved";

    // emmit an event.
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: { ...data, status: status },
    });
  }

  res.send({ status: "OK" });
});

const PORT = 4004;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
