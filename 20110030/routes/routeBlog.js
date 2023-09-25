const express = require('express');
// const {getAllFriend} = require('../controllers/controllers.friendcontroller');
// const {getFriendById} = require('../controllers/controllers.friendcontroller');
// const {addFriendById} = require('../controllers/controllers.friendcontroller');
// const {getFriendByMessage} = require('../controllers/controllers.friendcontroller');
// const {getFriendByMessageId} = require('../controllers/controllers.friendcontroller');
const router = express.Router();
const exphbs = require('express-handlebars');
const app = express();

// Configure Handlebars
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Set the path to your views directory
app.set('views', path.join(__dirname, 'views/index.hbs'));

// middleware that is specific to this router
app.get('/user', (req, res) => {
  const userData = {
      username: 'JohnDoe',
      email: 'johndoe@example.com',
  };

  res.render('user', userData); // Renders user.hbs with userData
});// define the about route

module.exports = router