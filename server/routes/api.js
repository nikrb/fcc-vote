const express = require('express');
const Poll = require( 'mongoose').model('Poll');

const router = new express.Router();

router.get('/mypolls', (req, res) => {
  let q = {};
  if( req.query.email){
    q.email = req.query.email;
  }
  Poll.find( q, function (err, docs){
    res.status(200).json( docs);
  });
});
router.post( '/poll', (req, res) => {
  const np = new Poll( req.body);
  np.save( (err) => {
    if( err) {
      res.json( { success: false, error: err});
    }
    res.json( { success: true});
  });
});

module.exports = router;
