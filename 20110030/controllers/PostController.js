const modelPost= require('../models/Post');
const posts = []; // Array to store posts

function getAllPost(req, res){
    if (posts) {
        res.status(200).json(posts);
    }
    else {
        res.status(400).json({error:'error'});
    }
}

function addPost(req, res){
    const { name } = req.body;
    const { content } = req.body;
    const newPost = new modelPost(posts.length + 1, name, content);
    posts.push(newPost);
    res.status(201).json(newPost);
}

function addComment(req, res){
    const ID = String(req.params.id);
    const { comment } = req.body;
    const post = posts.find((post) => String(post.id) === String(ID));
    if (post){
        post.comments.push(comment);
        res.status(201).json(post);
    }    
    else
    {
        res.status(404).send(`Cannot find post with id = ${ID}`);
    }
}

function deletePost(req, res){
    const ID = String(req.params.id);
    const postIndex = posts.findIndex((post) => String(post.id) === String(ID));

    if (postIndex !== -1) {
        posts.splice(postIndex, 1); // Corrected line
        res.status(200).send(`Deleted post ${ID}`);
    } else {
        res.status(404).send(`Cannot find post with id = ${ID}`);
    }
}

function editPost(req, res){
    const ID = String(req.params.id);
    const post = posts.find((post) => String(post.id) === String(ID));
    const  updatedName  = req.body.name;
    const updatedContent = req.body.content;
    if (post){
        post.name = updatedName;
        post.content = updatedContent; // Update the content of the post
        res.status(200).send(`Edited post ${ID}`);
    }    
    else
    {
        res.status(404).send(`Cannot find post with id = ${ID}`);
    }
}


module.exports = {
    getAllPost,
    addPost,
    addComment,
    deletePost,
    editPost
}