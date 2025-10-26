require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectFlash = require('express-flash-messages')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')




const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('../servers/config/db');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(connectFlash());
app.use(expressLayout);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './views');




// Routes here
app.use('/', require('../servers/routes/customer'))

// Handle 500


// Handle 404


connectDB();

app.get('/',  cors(), (req, res) => {
  res.status(404).render('404');
});












app.listen(PORT, () => {
  //mongoDB.connect();
  console.log(`Server is running on port localhost:${PORT}`);
});

