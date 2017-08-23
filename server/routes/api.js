const express = require('express');
const Poll = require( 'mongoose').model('Poll');

const router = new express.Router();

router.get('/mypolls', (req, res) => {
  let q = {};
  if( req.query.owner){
    q.owner = decodeURIComponent( req.query.owner);
  }
  Poll.find( q, function (err, docs){
    res.status(200).json( docs);
  });
});
router.post( '/poll', (req, res) => {
  Poll.find( {owner: req.body.owner, name: req.body.name}, function( err, docs){
    if( err){
      console.err( `find poll [${req.body.name}] failed:`, err);
    }
    let p;
    if( docs.length){
      p = docs[0];
      p.options = req.body.options;
    } else {
      p = new Poll( req.body);
    }
    p.save( (err) => {
      if( err) {
        res.json( { success: false, error: err});
      }
      res.json( { success: true});
    });
  });
});
router.post( '/depoll', (req, res) => {
  Poll.remove( { _id: req.body.id}, function( err){
    res.json( { results: "ok", error: err});
  })
});

module.exports = router;
