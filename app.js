const express = require("express");
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');

app.get("/", function(req, res) {
    res.send("hi");
});

app.get("/create", async function(req, res) {
    try {
        let user = await userModel.create({
            username: "sohaib",
            age: 25,
            email: "sohaib@gmail.com"
        });
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/post/create", async function(req,res){

let post = await postModel.create({
    postdata:'Hi everyone',
    user:"66b25e84f93a0c9c894f2d1e"
})
let user = await userModel.findOne({_id:"66b25e84f93a0c9c894f2d1e"});
user.post.push(post._id);
await user.save();
res.send({post, user});
 })
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
