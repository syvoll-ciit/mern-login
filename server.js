const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: "user", password: "password" },
  { id: 2, username: "syvoll", password: "secret" },
  { id: 3, username: "cherry", password: "strawberry" }
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: "Login successful", user });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));