const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const path = require('path')

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));



app.use((req, res, next) => {
  res.status(404).render('404');
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something Broke!');
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})