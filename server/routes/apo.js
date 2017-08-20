/**
 * apo.js

 endpoints not requiring auth
 
 */
const express = require('express');
const Poll = require( 'mongoose').model('Poll');

const router = new express.Router();

router.get('/polls', (req, res) => {
  Poll.find( {}, function (err, docs){
    res.status(200).json( docs);
  });
});

router.get('/poll', (req, res) => {
  let q = {};
  if( req.query.name){
    q.name = decodeURIComponent( req.query.name);
    Poll.find( q, function (err, docs){
      if( err || docs.length === 0){
        res.status( 404).json( {success:false});
      } else {
        if( docs.length){
          res.status(200).json( docs[0]);
        }
      }
    });
  } else {
    res.status( 404).json( {success: false});
  }
});

router.post( '/vote', (req, res) => {
  Poll.findOne( {name: req.body.name, "options.text": req.body.vote})
  .then( ( poll)=> {
    if( poll){
      let voter;
      if( req.body.email ){
        voter = req.body.email;
      } else {
        voter = req.headers['x-forwarded-for'].split(',')[0];
      }
      console.log( `poll [${poll.name}] option [${req.body.vote}] by [${voter}]`);

      const voted_already = poll.options.map( function( option){
        return option.votes;
      }).concatAll()
      .reduce( (p,c) => {
        return c === voter?true:p;
      }, false);

      if( voted_already){
        console.error( "rejected: already voted");
        res.json( {success: false, message: "user or ip already voted"})
      } else {
        const option_ndx = poll.options.findIndex( (op) => { return op.text === req.body.vote;});
        if( option_ndx === -1){
          console.error( "vote failed to find option!");
          res.status( 404).json( {success:false, message: "option not found"});
        } else {
          poll.options[option_ndx].votes.push( voter);
          poll.save( (err) => {
            if( err) {
              res.json( { success: false, error: err});
            }
            res.json( { success: true});
          });
        }
      }
    } else {
      res.status( 404).json( {success: false});
    }
  });
});

module.exports = router;
