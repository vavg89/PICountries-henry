const { Router } = require("express");
const router = Router();
const postActivity = require('../controllers/postActivity');
const getCountries = require('../controllers/getCountries');
const getActivity = require('../controllers/getActivity');
const getCountriesName = require('../controllers/getCountriesName');
const getCountriesId = require('../controllers/getCountriesId');


router.get('/countries', getCountries);
router.get('/countries/:cca3', getCountriesId);
router.get('/name', getCountriesName);
router.get('/activities', getActivity);
router.post('/activities', postActivity);
module.exports = router;
