module.exports = function(server) {
  // Install a "/ping" route that returns "pong"
  server.get("/ping", function(req, res) {
    res.send("pong");
  });

  server.use("/express-status", function(req, res, next) {
    res.json({ running: true });
  });
};
