require('dotenv').config();
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const session = require('express-session');
//const flash = require('express-flash-message');
const expressLayout = require('express-ejs-layouts');
const flash = require('connect-flash');



const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('../servers/config/db');

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(expressLayout);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days = 1week
  }
}))

// Flash Messages
app.use(flash());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './views');




// Routes here
app.use('/', require('../servers/routes/customer'))

// Handle 500


// Handle 404


connectDB();

app.get('/',  cors(), async(req, res) => {
  await req.flash('info', 'page not found!');
  res.status(404).render('404');
});












app.listen(PORT, () => {
  //mongoDB.connect();
  console.log(`Server is running on port localhost:${PORT}`);
});

