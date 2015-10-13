var uuid  = require("uuid"); // if it's a module that you get off npm, you can say the name of the package itself. in this case it is.

var PenModule = {
   collection: [],
   findPen: function(id, cb){
      for(var i=0; i<this.collection.length; i++){
         if(this.collection[i].id === id){
            return cb(null, this.collection[i]);
         }
      } //end of for loop over the pen collection
      cb({err: "Could not find a pen with that id."});
   },
   create: function(penObj, cb){
      if(!penObj.img || ! penObj.name || !penObj.color){ // if the image name or color does not exist then don't make a new object.
         return cb({err: "Please include all required fields."})
      }
         var pen = new Pen(penObj.img, penObj.name, penObj.color);
         this.collection.push(pen)
         cb(null, pen); // node is run on call backs. call a function that has 2 parameters. 1st param is an error (if error, then message. if no error, then null). 2nd param return the  result, in this case an obj.
   },
   update: function(pen, cb){
      for(var i=0; i <this.collection.length; i++){
         if(this.collection[i].id === pen.id){
            this.collection[i] = pen;
            return cb(null, pen);
         }
      } // end of for loop over the pen collection
      cb({err: "Could not find a pen with that id."});
   },
   remove: function(id, cb){ // pass in id of the pen. also put in a call back function
         for(var i=0; i < this.collection.length; i++){
            if(this.collection[i].id === id){
               this.collection.splice(i, 1);
               return cb(null, {message: "success!"});
            }
         } // end for loop over collection array
         // otherwise, if nothing if found in the array that matches the id
         cb({err: "Could not find a pen with that id."})
   }
};

var bic = new Pen("http://coupon-closet.weethreellc.netdna-cdn.com/wp-content/uploads/2011/07/biro_pa460.jpg", "Bic", "blue");
var ballPoint = new Pen("http://cdn.shopify.com/s/files/1/0274/3825/products/Lexon-Tykho-Ballpoint-Pen-Red-LS78R8.jpeg?v=1384218012", "Ball point", "black");
var glitter = new Pen("https://s-media-cache-ak0.pinimg.com/736x/39/d4/e8/39d4e84a1657b54a9e900227136b5154.jpg", "GLITTER!", "glittery goodness");
PenModule.collection.push(bic, ballPoint, glitter);


//this is a constructor function
function Pen(img,name,color){
   this.id = uuid.v4(); // setting id equal to a randomly generated id. this is a function built into uuid. v1 -is a time based id. v4 - completely random uuid.
   this.img = img;
   this.name = name;
   this.color = color;
}

module.exports = PenModule; // only exporting the PenModule object, not the constructor function
