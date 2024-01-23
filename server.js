const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dbPassword = encodeURIComponent("Vinay@2002");
const dbURL = `mongodb+srv://vinay:${dbPassword}@blog-site.spvflgy.mongodb.net/BLOG-SITE?retryWrites=true&w=majority`;
const blogRoutes = require('./routes/blogRoutes')

mongoose
  .connect(dbURL)
  .then(() => {
    app.listen(10000, () => {
      console.log("listening to port 10000");
    });
  })
  .catch((err) => console.error(`Could not connect to the database: ${err}`));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
 res.redirect('/blogs');
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
