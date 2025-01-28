const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();
const path = require('path');
const indexRouter = require('./routes/indexRouter');
const developersRouter = require('./routes/developersRouter');
const gamesRouter = require('./routes/gamesRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const cors = require('cors');

app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.post('/authorize', (req, res) => {
  const password = req.body.password;
  if (password === process.env.ADMIN_PASSWORD)
    res.send({valid : 'TRUE'});
  else
    res.send({valid : 'FALSE'});
})
app.use('/', indexRouter);
app.use('/games', gamesRouter);
app.use('/developers', developersRouter);
app.use('/categories', categoriesRouter);

app.use((req, res, next) => {
  res.status(404).render('404');
})

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).render('broke');
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})