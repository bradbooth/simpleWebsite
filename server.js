const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  //console.log(log)
  fs.appendFile('server.log', log + '\n', (err) =>{
    if (err){
      console.log('Unable to append file' + err);
    }
  })
  next(); //required!
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my homepage',
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    error: 0,
    errorMsg:'Unable to handle that request'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
