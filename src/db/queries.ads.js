const Advertisement = require("./models").Advertisement;

module.exports = {

    getAllAds(callback){
        return Advertisement.findAll()
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addAdvertisement(newAd, callback) {
        return Advertisement.create({
            title: newAd.title,
            description: newAd.description
        })
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getAd(id, callback) {
        return Advertisement.findById(id)
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteAd(id, callback) {
        return Advertisement.destroy({
            where: {id}
        })
        .then((advertisement) => {
            callback(null, advertisement);
        })
        .catch((err) => {
            callback(err);
        })
    }

}