const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const Toilet = require("../models/Toilet");

// create a toilet
router.post('/', (req, res) => {
  const {name, description, location, lng, lat, locType, genderNeutral, free} = req.body
    Toilet.create({
      name, description, location, lng, lat, locType, genderNeutral, free,
      user: [req.user._id]
    })
    .then(toilet => {
        console.log("let me see da toilet", toilet);
        res.json(toilet)
    })
    .catch(err => {
        res.json(err);
      })
})

// get all toilets
router.get('/', (req, res, next) => {
    Toilet.find(function (err, toilets) {
        if (err) return next(err);
        res.json(toilets);
      });
    });

// get ind toilet by id
router.get('/:id', function(req, res, next) {
    Toilet.findById(req.params.id, function (err, toilet) {
      if (err) return next(err);
      res.json(toilet);
    });
  });


// edit one
router.put('/:id', function(req, res, next) {
    Toilet.findByIdAndUpdate(req.params.id, req.body, function (err, toilet) {
      if (err) return next(err);
      res.json(toilet);
    });
  });

// delete
  router.delete('/:id', function(req, res, next) {
   Toilet.findByIdAndRemove(req.params.id, req.body, function (err, toilet) {
      if (err) return next(err);
      res.json(toilet);
    });
  });


module.exports = router;