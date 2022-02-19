var express = require('express');
var router = express.Router();

/* GET user listing. */
router.get('/1', function(req, res, next) {
  res.send('just text');
});

module.exports = router;
