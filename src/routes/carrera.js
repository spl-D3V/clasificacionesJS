const express = require('express');
const router = express.Router();
router.get('/', (req, res) =>{res.render("clasificacion");});
module.exports = router;