const path = require('path');
const cors = require('cors')
const User = require('../models/userToken');
const express = require('express');

const movieController = require('../controllers/movie');

const router = express.Router();

//route fetch top trend, co the tim thay link fetch tai frontend/src/pages/storerage
router.get('/trending', movieController.getTrending);
//route fetch top rate, co the tim thay link fetch tai frontend/src/pages/storerage
router.get('/top-rate',movieController.getRating);
//route fetch discover, de tim danh sach phim theo the loai bang ten, co the tim thay link fetch tai frontend/src/pages/storerage
router.get('/discover',movieController.getDiscoverByName);
//route fetch discover, de tim danh sach phim theo the loai bang id
router.get('/discoverID',movieController.getDiscover);
//route fetch trailer, co the tim thay link fetch tai frontend/src/pages/browser/movieDetails.js
router.post('/videos',movieController.getTrailer);
//route fetch search, co the tim thay link fetch tai frontend/src/pages/storerage
router.post('/search',movieController.getSearch);

module.exports = router;