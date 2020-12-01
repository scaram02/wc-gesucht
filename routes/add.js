const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const Toilet = require("../models/Toilet");
const Comment = require('../models/Comment')

// create a toilet
router.post('/', (req, res) => {
  const {name, description, lng, lat, locType, genderNeutral, free, femProd, changingTable, barrierFree} = req.body
    Toilet.create({
      name, description, lng, lat, locType, genderNeutral, free, femProd, changingTable, barrierFree,
      user: [req.user._id],
      // comments: [req.comment._id]
    })
    .then(toilet => {
        console.log("let me see da toilet", toilet);
        res.json(toilet)
    })
    .catch(err => {
        res.json(err);
      })
})



router.get('/', (req, res, next) => {
  Toilet.find()
  .populate('user')
  .populate({ path: "comments", populate: { path: "user" } })
  .then(theToilets => {
    res.json(theToilets)
  })
})



router.get('/:id', (req, res, next) => {
  Toilet.findById(req.params.id)
  .populate('user')
  .populate({ path: "comments", populate: { path: "user" } })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.json(err);
  });
  });



// edit one
router.put('/:id', (req, res, next) => {
    Toilet.findByIdAndUpdate(req.params.id, req.body, (err, toilet) => {
      if (err) return next(err);
      res.json(toilet);
    });
  })


// delete
  router.delete('/:id', (req, res, next) => {
   Toilet.findByIdAndRemove(req.params.id, req.body, (err, toilet) => {
      if (err) return next(err);
      res.json(toilet);
    });
  });


// // links to getAllToilets() in App
router.get("/mytoilets", (req, res, next) => {
  Toilet.find()
    .populate("user")
    .then(allToilets => {
      res.json(allToilets);
    })
    .catch(err => {
      res.json(err);
    });
});
 

module.exports = router;