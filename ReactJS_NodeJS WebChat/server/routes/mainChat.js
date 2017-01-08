const express = require('express');
const router = express.Router();

router.get('/main', (req, res, next)=> {
  return res.status(200).json({ message: "You're authorized to see this secret message."});
});



module.exports = router;
