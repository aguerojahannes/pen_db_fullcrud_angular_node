// We don't have NPM START to run srver.
// console.log("This is a server.")
// in terminal, write node server.js

var express = require("express"); // bring in express into app
var app = express(); // create an instance of expression, so ppl can connect to
var bodyParser = require("body-parser");
var Pen = require("./models/Pen"); // require module so we can use it in our routes.


// Goal: return  an index.html file to the user
// You rarely have to type this. Know what it does.
app.set("views", "./views"); // /views/index/html ==> index.html
app.engine("html", require("ejs").renderFile); // when we want to render html file, this is how we're going to do it, using ejs
app.set("view engine", "html"); // the default view engine is .html. is file ends in .html we dont have to include the .html at the end.
app.use(express.static("./public")); // create a folder to use on client side. it's everything that the index can use.  we decide what client gets (not server). could be app.use("/", express.static("./public"))
app.use(express.static("./bower_components"));
app.use(bodyParser.json()); // send json objects to server
app.use(bodyParser.urlencoded({extended: true})); // or we can send info in url format


// put in a route
// GET localhost:3000/
app.get("/", function(req,res){
   res.render("index");
})

// GET /api/v1/pens
app.get("/api/v1/pens", function(req, res){ // make it a special folder for API (bc we;re bringing in a json file). give it a version number. then a semantic name.
res.send(Pen.collection);
});

// GET api/v1/pens/:id
// making a request to find a specific pen based on its id
app.get("/api/v1/pens/:id", function(req,res){
   Pen.findPen(req.params.id, function(err,result){
      if(err) return res.status(400).send(err);
      res.send(result);
   })
})

// POST /api/v1/pens
app.post("/api/v1/pens", function(req, res){
Pen.create(req.body, function(err, result){
   if(err) return res.status(400).send(err);
   res.send(result);
   });
});

// PUT /api/v1/pen/:id
app.put("/api/v1/pens/:id", function(req,res){
   Pen.update(req.body, function(err, result){
      if(err) return res.status(400).send(err);
      res.send(result);
   })
})

// DELETE /api/v1/pens/:id -- we created :id as a new variable in app.js to keep track of the ids. then we used var id = $stateParams.id
app.delete("/api/v1/pens/:id", function(req, res){
   Pen.remove(req.params.id, function(err, result){
      if(err) return res.status(400).send(err);
      res.send(result);
   });
});

// GET anything that does not exist above - LEAVE AT BOTTOM
app.use("/", function(req,res){ // look for any verb/method for a route that has this in it. if it said /test, it would go to /test, /test/cat, /test/fa/tind etc. starts from the top and works its way done. if the route (/) does not exist in any of the previous routes, run this function.
   res.render("404");
})

app.listen(3000, function(){ // anytime we see someone connect to localhost:3000 this is where we're connecting.
   console.log("Server is running on http://localhost:3000")
})
// then run node server.js on terminal
