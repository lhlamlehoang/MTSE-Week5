const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const axios = require('axios');

// Set the view engine to use HBS templates
app.set('view engine', 'hbs');

// Define the directory for HBS views and partials
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

// Middleware to serve static files (e.g., stylesheets)
app.use(express.static(__dirname + '/views'));

// Router
const router = require('./routes/routeBlog');


app.use(bodyParser.urlencoded({ extended: true }));
// Define a route to render the index page
app.get('/', async (req, res) => {
  try {
    // Make a GET request to /getAllPost to fetch JSON data
    const response = await axios.get('http://localhost:5000/getAllPost');


    // Check if the response contains data
    if (response.data) {
      res.render('index', {
        title: "Basic Blog",
        postData: response.data, // Use the fetched JSON data
        postId: response.data.id,
        lblName: "Post Name",
        lblContent: "Post Content",
        inputName: "Input post name here",
        inputContent: "Input post content here",
        lblDelete: "Are you sure to delete this post?",
        lblTitleAdd: "Add a new post",
        lblTitleEdit: "Edit post",
        lblTitleDelete: "Delete post"
      });
    } else {
      res.render('index', {
        title: "Basic Blog",
        postData: [], // If no data is available
        postId: response.data.id,
        lblName: "Post Name",
        lblContent: "Post Content",
        inputName: "Input post name here",
        inputContent: "Input post content here",
        lblDelete: "Are you sure to delete this post?",
        lblTitleAdd: "Add a new post",
        lblTitleEdit: "Edit post",
        lblTitleDelete: "Delete post"
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error.response ? error.response.status : error.message);
    res.status(500).send("Error fetching data", error.response ? error.response.status : error.message);
  }
});

app.use(bodyParser.json());

app.use('/', router);
app.use('/getAllPost', router);
app.use('/addPost', router);
app.use('/addComment/:id', router);
app.use('/deletePost/:id', router);
app.use('/editPost/:id', router);


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
