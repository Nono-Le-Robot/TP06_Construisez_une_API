const express = require("express");
const app = express();
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces')
const usersRoutes = require("./routes/user")
const path = require('path')

mongoose.connect(`mongodb+srv://Admin:${process.env.mpw}@cluster0.ep4znvs.mongodb.net/?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'))

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', usersRoutes)
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;