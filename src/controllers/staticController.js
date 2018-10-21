

module.exports = {
    index(req, res, next) {
        res.render("static/index", {title: "Welcome ot Bloccit"});
    }
    // about(req, res, next) {
    //     res.send("About Bloccit");
    // }
};