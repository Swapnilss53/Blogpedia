require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const PASSWORD = process.env.PASSWORD;

const homeStartingContent = "Hello User, you can create blog edit them and read them";
const aboutContent = "I am swapnil shinde, studying in last year of Elctrical Engineering, at MET Institute of Engineering Nashik.I do have a strong interest in Computer Science.";
const contactContent = "Reach out to me on email:swapnilshinde532001@gmail.com. to call me use 7709392293  or connect me on LinkedIn:https://www.linkedin.com/in/swapnillshinde/";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const address = "mongodb+srv://Swapnil53:"+ PASSWORD + "@cluster0.njsx7pm.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(address);

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
