const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/bookDB",{
  useNewUrlParser: true,
 useUnifiedTopology: true
});

const bookSchema = new mongoose.Schema({
  title : String,
  author : String,
  description : String
});

const Book = mongoose.model('Book',bookSchema);

// const book1 = new Book({
//   title : "book1",
//   author : "Not Known",
//   description : ""
// });
//
// book1.save();

app.get('/',function(req,res){
  Book.find({},function(err,foundBooks){
    if(err){
      res.send("Nothing found with error  " + err);
    } else{
      res.send(foundBooks);
    }
  });
});

app.post('/',function(req,res){
  const title = req.body.title;
  const auth = req.body.author;
  const desc = req.body.desc;
  console.log(title +auth+ desc);

  const book = new Book({
    title : title,
    author : auth,
    description : desc
  });

  book.save(function(err){
    if(!err){
      res.send("Saved Successfuly");
    } else {
      res.send("You have to solve this err " + err);
    }
  })

});

app.delete('/',function(req,res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Success");
    }else{
      res.send(err);
    }
  });
});

app.get('/books/:bookTitle',function(req,res){
  Book.findOne({title: req.params.bookTitle},function(err,foundBook){
    if(!err){
      if(foundBook){
        res.send(foundBook);
      } else{
        res.send("Book not found ");
      }
    } else{
        res.send("You have to solve this err " + err);
    }
  });
});

app.delete('/books/:bookTitle',function(req,res){
  Book.deleteOne({title : req.params.bookTitle},function(err){
    if(!err){
      res.send("Deleted successfully");
    }else{
      res.send("You have to solve this err " + err);
    }
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
