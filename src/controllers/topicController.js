const topicQueries = require("../db/queries.topics.js");

const Authorizer = require("../policies/topic");


module.exports = {

    index(req, res, next) {
        topicQueries.getAllTopics((err, topics) => {
            if(err) {
                res.redirect(500, "static/index");
                console.log(err);
            } else {
                res.render("topics/index", {topics});
            }
            // console.log(topics);
        })
    },

    // new(req, res, next) {
    //     res.render("topics/new");
    // },

    //checkpoint 12 - it didn't say to get rid of the old 'new' functionality, I can see this causing issues
    //going to comment out the older 'new' for now
    new(req, res, next) {
        const authorized = new Authorizer(req.user).new();
    
        if(authorized) {
            res.render("topics/new");
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/topics");
        }
    },

    create(req, res, next) {
        const authorized = new Authorizer(req.user).create();

        if(authorized) {
            let newTopic = {
                title: req.body.title,
                description: req.body.description
                // HELP: is the below needed to pass topicId???
                // description: req.body.description,
                // topicId: req.params.topicId,
                // userId: req.user.id
            };
            topicQueries.addTopic(newTopic, (err, topic) => {
                if(err) {
                    console.log(err);
                    res.redirect(500, "topics/new");
                } else {
                    res.redirect(303, `/topics/${topic.id}`);
                }
            });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/topics");
        }
    },

    show(req, res, next) {
        topicQueries.getTopic(req.params.id, (err, topic) => {
            console.log(err, topic);
            if(err != null || topic == null) {
                console.log(err);
                res.redirect(404, "/");
            } else {
                res.render("topics/show", {topic});
            }
        });
    },

    destroy(req, res, next) {
        topicQueries.deleteTopic(req, (err, topic) => {
            if(err) {
                res.redirect(err, `/topics/${req.params.id}`)
            } else {
                res.redirect(303, "/topics")
            }
        });
    },

    edit(req, res, next) {
        topicQueries.getTopic(req.params.id, (err, topic) => {
            if(err || topic == null) {
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, topic).edit();
                if(authorized) {
                    res.render("topics/edit", {topic});
                } else {
                    req.flash("You are not authorized to do that.")
                    res.redirect(`/topics/${req.params.id}`)
                }
            }
        });
    },

    update(req, res, next) {
        topicQueries.updateTopic(req, req.body, (err, topic) => {
            if(err || topic == null) {
                res.redirect(401, `/topics/${req.params.id}/edit`);
            } else {
                res.redirect(`/topics/${req.params.id}`);
            }
        });
    }

}