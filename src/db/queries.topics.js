const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {

    getAllTopics(callback) {
        return Topic.all()
        //is plural right?
        .then((topics) => {
            callback(null, topics);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getTopic(id, callback) {
        return Topic.findById(id)
        return Topic.findById(id, {
            include: [{
                model: Post,
                as: "posts"
            }]
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    addTopic(newTopic, callback) {
        return Topic.create({
            title: newTopic.title,
            description: newTopic.description
        })
        .then((topic) => {
            //HELP: Don't understand the "null" here
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    deleteTopic(id, callback) {
        return Topic.destroy({
            where: {id}
        })
        .then((topic) => {
            callback(null, topic);
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateTopic(id, updatedTopic, callback) {
        return Topic.findById(id)
        .then((topic) => {
            if(!topic) {
                return callback("Topic not found");
            }
            //Perfect example of plural being confusing with things named so similarly
            topic.update(updatedTopic, {
                fields: Object.keys(updatedTopic)
            })
            .then(() => {
                callback(null, topic);
            })
            .catch((err) => {
                callback(err);
            });
        });
    }

}