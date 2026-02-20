const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Temporary in-memory storage
let posts = [];

// list all posts
app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

// form to create post
app.get('/posts/new', (req, res) => {
    res.render('new');
});

// create new post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: posts.length + 1,
        title,
        content
    };

    posts.push(newPost);
    res.redirect('/posts');
});

// view single post
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.send("Post not found");
    }

    res.render('post', { post });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
