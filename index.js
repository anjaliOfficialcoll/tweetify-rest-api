const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        id:uuidv4(),
        username:"lily",
        content:"Hello, this is my first post!",
        createdAt:new Date().toISOString()
    },
    {
        id:uuidv4(),
        username:"john",
        content:"Excited to join this platform!",
        createdAt:new Date().toISOString()
    },
    {
        id:uuidv4(),
        username:"emma",
        content:"Looking forward to connecting with everyone!",
        createdAt:new Date().toISOString()
    },
    {
        id:uuidv4(),
        username:"michael",
        content:"Just had a great day!",
        createdAt:new Date().toISOString()
    }
];

// app.get("/",(req,res)=>{
//     res.redirect("/posts");
// });

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    console.log("Received POST data:", req.body);
    let newId=uuidv4();
    
    posts.push({id:newId,username,content,createdAt:new Date().toISOString()});
    console.log("Total posts now:", posts.length);
    res.redirect("/posts");

});

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params;
   let post=posts.find(p=>id===p.id);
   if(!post){
      return res.send("Post not found");
   }
   res.render("show.ejs",{post});

});

app.post("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find(p=>id===p.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    post.content=newContent;
    console.log("Updated post:", post);
    res.redirect("/posts");
});


app.get("/posts/:id/edit",(req,res)=>{
   let {id}=req.params;
   let post=posts.find(p=>id===p.id);
    if(!post){
        return res.status(404).send("Post not found");
    }
  res.render("edit.ejs",{post});

});


app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter(p=>p.id!==id);
    res.redirect("/posts");
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

