const express = require("express");
const router = express.Router();
const restrictToLoggedInUser = require("../middlewares/auth");

const { handleGenerateNewShortURL, handleRedirectToOriginalURL, handleGetAnalytics, handleGetAllUrls } = require("../controllers/url");

router.post('/', restrictToLoggedInUser, handleGenerateNewShortURL);

router.get('/analytics/:shortId', restrictToLoggedInUser, handleGetAnalytics);

router.get('/', restrictToLoggedInUser, handleGetAllUrls);

router.get('/:shortId', handleRedirectToOriginalURL);

module.exports = router;