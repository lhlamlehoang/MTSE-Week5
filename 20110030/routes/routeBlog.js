const express = require('express');
const {getAllPost} = require('../controllers/PostController');
const {addPost} = require('../controllers/PostController');
const {addComment} = require('../controllers/PostController');
const {deletePost} = require('../controllers/PostController');
const {editPost} = require('../controllers/PostController');

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date(Date.now()))
  next()
})

router.get('/getAllPost', getAllPost);
router.post('/addPost', addPost);
router.post('/addComment/:id', addComment);
router.post('/deletePost/:id', deletePost);
router.post('/editPost/:id', editPost);

// define the about route

module.exports = router