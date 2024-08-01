const jwt = require('jsonwebtoken');
const dbClient = require("../db.js");
const key = require("../key.js");

const database = dbClient.client.db("etax");
exports.login = async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await database.collection("demo_xml").findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      key.jwtSecretkey = key.keyGen();
      console.log("key login: " + key.jwtSecretkey);
      res.status(200);
      let data = {
          date: Date(),
          user: user,
        };
      const token = jwt.sign(data, key.jwtSecretkey);
      res.send(token);
    }
  }
  catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}