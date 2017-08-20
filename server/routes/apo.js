const express = require('express');
const Poll = require( 'mongoose').model('Poll');

const router = new express.Router();

router.get('/polls', (req, res) => {
  Poll.find( {}, function (err, docs){
    res.status(200).json( docs);
  });
});

module.exports = router;
