const express = require('express');
var path = require('path');
const data = require('./data.json'); 

const app = express();
const port = 3000;

app.use(express.json());

// Set the view engine to Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Serve static files from the public directory
app.use( '/static', express.static('public') );

// Defining routes
//For IndexPage
app.get('/', (req, res) => {
  const projects = data.projects;
  res.render('index', { projects });
});

//For About Page
app.get('/about', (req, res) => {
  res.render('about');
});

//For Projects Page
app.get('/project/:id', (req, res, next) => {
  const id = req.params.id;
  const ProjectData = data.projects[id];

  if (ProjectData) {
      res.render('project', {ProjectData});
  } else {
      next();
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status)
  res.render('error');
})

// Start the server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
