const adQueries = require("../db/queries.ads.js");

module.exports = {
    index(req, res, next) {
        //did I do 'ads' ok?
        adQueries.getAllAds((err, ads) => {
            if(err) {
                res.redirect(500, "static/index");
            } else {
                res.render("ads/index", {ads});
            }
        })
    },
    
    new(req, res, next) {
        res.render("advertisement/new");
    },

    create(req, res, next) {
        let newAd = {
            title: req.body.title,
            description: req.body.description
        };
        adQueries.addAdvertisement(newAd, (err, advertisement) => {
            if(err) {
                res.redirect(500, "/advertisement/new");
            } else {
                res.redirect(303, `/advertisement/${advertisement.id}`)
            }
        })
    }


}