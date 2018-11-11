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
        res.render("ads/new");
    },

    create(req, res, next) {
        let newAd = {
            title: req.body.title,
            description: req.body.description
        };
        adQueries.addAdvertisement(newAd, (err, advertisement) => {
            if(err) {
                res.redirect(500, "/ads/new");
            } else {
                res.redirect(303, `/ads/${advertisement.id}`)
            }
        });
    },

    show(req, res, next) {
        adQueries.getAd(req.params.id, (err, advertisement) => {
            if(err || advertisement == null) {
                res.redirect(404, "/");
            } else {
                res.render("ads/show", {advertisement});
            }
        });
    },

    destroy(req, res, next) {
        adQueries.deleteAd(req.params.id, (err, advertisement) => {
            if(err) {
                res.redirect(500, `/ads/${advertisement.id}`)
            } else {
                res.redirect(303, "/ads")
            }
        });
    }

}