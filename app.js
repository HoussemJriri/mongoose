const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const person = require("./userSchema");
const router = express.Router();
const app = express();
//const db = require("db");
mongoose.connect(
  process.env.url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("mongodb connection error ");
    } else {
      console.log("Successful database connection");
    }
  }
);
let personmodel = new person({
  name: "houssem",
  age: 26,
  favoriteFoods: ["pizza", "fricase"],
});


personmodel.save(function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});
//createmanypeople
/* const arrayofpeople=[{name:'ala',age:'13',favoriteFoods:['seafood','spaghetti','sushi']}
,{name:'maryem',age:'21',favoriteFoods:['pizza','ejja','chappati']}];*/
app.post("/", (req, res) => {
  person.create(req.body, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});
app.get("/all", (req, res) => {
  person
    .find()
    .then((users) => res.send(users))
    .catch((err) => console.error(err.message));
});
//findOne
app.get("/users/:name", (req, res) => {
  person
    .find({
      name: req.params.name, // search query
    })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
      res.send("Server Error");
    });
});
//find byId
app.get("/users/:_id", (req, res) => {
  person
    .findOne({ _id: req.params._id })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.error(err);
      res.send("Server Error");
    });
});
//find and update foods
app.get("/users/foods/:age", (req, res) => {
  person
    .findOne({ age: req.params.age }, function (err, data) {
      if (err) {
        return done(err);
      }
      data.favoriteFoods.push("humburger");
      data.save(function (err, data) {
        if (err) {
          return done(err);
        } else {
          return done(null, data);
        }
      });
    })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("error");
      console.error(err);
      res.send("Server Error");
    });
});
//set age 
app.get("/users/age/:name", (req, res) => {
  person
    .findOneAndUpdate({ name: req.params.name }, { age: 20 })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("error");
      console.error(err);
      res.send("Server Error");
    });
});
// delete person
app.get("/users/delete/:_id", (req, res) => {
  person
    .findByIdAndRemove(req.params._id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Removed User : ", docs);
      }
    })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("error");
      console.error(err);
      res.send("Server Error");
    });
});
//remove all person named "houssem"
app.get("/users/remove/:name", (req, res) => {
  person
    .remove({ name: req.params.name })
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("error");
      console.error(err);
      res.send("Server Error");
    });
});
// Find people who like pizza. Sort them by name
app.get("/users/sortbyfood/food", (req, res) => {
  person
    .find({ favoriteFoods: "pizza" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: true })
    .exec()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      console.log("error");
      console.error(err);
      res.send("Server Error");
    });
});
app.listen(5000, (err) => {
  if (err) console.log(err);
  else console.log("server running on port 5000");
});
//
