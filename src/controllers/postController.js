const postQueries = require("../db/queries.posts.js");

const Authorizer = require("../policies/post");


module.exports = {

    // new(req, res, next) {
    //     const authorized = new Authorizer(req.user).new();
    
    //     if(authorized) {
    //         res.render("posts/new");
    //     } else {
    //         req.flash("notice", "You are not authorized to do that.");
    //         res.redirect("/posts");
    //     }
    // },
    new(req, res, next) {
        res.render("posts/new", {topicId: req.params.topicId});
    },

    create(req, res, next) {
        const authorized = new Authorizer(req.user).create();

        if(authorized) {
            let newPost = {
                title: req.body.title,
                body: req.body.body,
                topicId: req.params.topicId,
                userId: req.user.id
            };
            postQueries.addPost(newPost, (err, post) => {
                if(err) {
                    res.redirect(500, "posts/new");
                    console.log(err);
                } else {
                    //assignment 12 - is post.id right here?
                    res.redirect(303, `/posts/${post.id}`);
                }
            });
        } else {
            req.flash("notice", "You are not authorized to do that.");
            res.redirect("/posts");
        }
    },

    show(req, res, next) {
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null) {
                res.redirect(404, "/");
            } else {
                res.render("posts/show", {post});
            }
        });
    },

    destroy(req, res, next) {
        postQueries.deletePost(req.params.id, (err, deletedRecordsCount) => {
            if(err) {
                res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`)
            } else {
                // res.redirect(303, "/posts")
                res.redirect(303, `/topics/${req.params.topicId}`)

            }
        });
    },

    edit(req, res, next) {
        postQueries.getPost(req.params.id, (err, post) => {
            if(err || post == null) {
                res.redirect(404, "/");
            } else {
                const authorized = new Authorizer(req.user, post).edit();

                if(authorized) { 
                    res.render("posts/edit", {post});
                } else {
                    req.flash("You are not authorized to do that.")
                    res.redirect(`/posts/${req.params.id}`)
                }
            }
        });
    },

    update(req, res, next) {
        postQueries.updatePost(req, req.body, (err, post) => {
            if(err || post == null) {
                res.redirect(401, `/posts/${req.params.id}/edit`);
            } else {
                res.redirect(`/posts/${req.params.id}`);
            }
        });
    }

}