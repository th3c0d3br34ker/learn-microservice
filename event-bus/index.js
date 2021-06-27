const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

// const PORTS = [4001, 4002, 4003, 4004];

const services = [
  "http://posts-clusterip-srv:4001/events",
  "http://comments-clusterip-srv:4002/events",
  "http://query-clusterip-srv:4003/events",
  "http://moderation-clusterip-srv:4004/events",
];

const events = [];

app.get("/events", (_, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // PORTS.forEach((PORT) => {
  //   // relay an event.
  //   axios.post(`http://localhost:${PORT}/events`, event);
  // });

  services.forEach(async (service) => {
    await axios.post(service, event);
  });

  res.send({ status: "OK" });
});

const PORT = 4005;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
