const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

    beforeEach((done) => {
        this.topic;
        this.flair;
        sequelize.sync({force: true}).then((res) => {

            Topic.create({
            title: "What to do at Home",
            description: "A list of things to do at home."
            })
            .then((topic) => {
                this.topic = topic;
                Flair.create({
                    name: "Family",
                    color: "Orange",
                    topicId: this.topic.id
                })
                .then((flair) => {
                    this.flair = flair;
                    done();
                });
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#create()", () => {
        it("should create a new flair with name and color to an assigned topic", (done) => {
            Flair.create({
                name: "Holidays",
                color: "Green",
                topicId: this.topic.topicId
            })
            .then((flair) => {
                expect(flair.name).toBe("Holidays");
                expect(flair.color).toBe("Green");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
        it("should NOT create a flair with missing name, color, or assigned topicId", (done) => {
            Flair.create({
                name: "Holidays"
            })
            .then((flair) => {
                done();
            })
            .catch((err) => {
                expect(err.message).toContain("Flair.name cannot be null");
                expect(err.message).toContain("Flair.topicId cannot be null");
                done();
            })
        });
    });

    describe("#setTopic()", () => {
        it("should associate a topic and a flair together", (done) => {
            Topic.create({
                title: "Political topics to ask your parents",
                description: "Gun Control"
            })
            .then((newTopic) => {
                expect(this.flair.topicId).toBe(this.topic.id);
                this.flair.setTopic(newTopic)
                .then((flair) => {
                    expect(flair.topicId).toBe(newTopic.id);
                    done();
                });
            })
        });
    });

    describe("#getTopic()", () => {
        it("should return the associated topic", (done) => {
            this.flair.getTopic()
            .then((associatedTopic) => {
                expect(associatedTopic.title).toBe("What to do at Home");
                done();
            });
        });
    });

});