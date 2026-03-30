require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");

connectToDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on PORT ${PORT}`);
});