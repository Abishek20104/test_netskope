import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  user: "root",
  password: process.env.DB_PASS,
  database: "test",
  socketPath: "/cloudsql/PROJECT_ID:REGION:practice-instance",
});

app.get("/", (req, res) => {
  res.send("Cloud Run MySQL Connected");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM mytable");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;

    const [result] = await pool.query(
      "INSERT INTO mytable(name, age) VALUES (?, ?)",
      [name, age]
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
