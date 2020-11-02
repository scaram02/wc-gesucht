const User = require("../models/User");
const Toilet = require("../models/Toilet")
const express = require("express");
const router = express.Router();

// ?????? //.get('/dashboard') ?
router.get('/add'), (req, res) => {
    Toilet.find(
      // { user: req.user._id}
      )
    .then(toilets => {
        res.json(toilets)
    })
    .catch(err => {
        console.log(err)
    })
}

//get coords
router.get('/api/toiletcoordinates', (req, res, next) => {
    Toilet.find().then(toilets => {
      res.json(toilets)
    }).catch(err => {
      next(err)
    })
  })
module.exports = router;