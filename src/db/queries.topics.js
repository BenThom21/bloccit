const Topic = require("./models").Topic;

module.exports = {

    getAllTopics(callback) {
        return Topic.all()
        .then((topics) => {
            callback(null, topics);
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
    }
    
}