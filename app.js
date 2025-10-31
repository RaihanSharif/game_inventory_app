const express = require("express");
const app = express();
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", (req, res) => {
  res.render("index", {
    title: "Games Inventory",
    games: [
      { id: 0, title: "God of war", publish_date: "2005-10-12" },
      { id: 1, title: "Call of Duty 4", publish_date: "2008-12-12" },
      { id: 2, title: "Minecraft", publish_date: "2015-03-22" },
      { id: 3, title: "Age of Empires", publish_date: "2007-04-04" },
    ],
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}`);
});
