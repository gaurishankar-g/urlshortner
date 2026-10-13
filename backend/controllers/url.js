const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            error: "url is required "
        })
    }
    const shortId = shortid.generate();
    await URL.create({
        userId: req.userId,
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    });

    return res.status(201).json({
        success: true,
        message: `Short id ${shortId}`
    })
}

async function handleRedirectToOriginalURL(req, res) {
    const shortId = req.params.shortId;
    const url = await URL.findOneAndUpdate(
        {
            shortId: shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: new Date().toISOString()
                }
            }
        }
    )

    res.redirect(url.redirectUrl)

}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const url = await URL.findOne({
        shortId: shortId,
        userId: req.userId
    });

    if (!url) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: `Analytics for ${shortId}`,
        data: {
            totalClicks: url.visitHistory.length,
            visitHistory: url.visitHistory
        }
    })
}

async function handleGetAllUrls(req, res) {
    const urls = await URL.find({ userId: req.userId }).sort({ createdAt: -1 });
    return res.status(200).json({
        success: true,
        message: "All URLs",
        data: urls
    })
}   

module.exports = {
    handleGenerateNewShortURL, handleRedirectToOriginalURL, handleGetAnalytics, handleGetAllUrls
}