const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe ("Topic", () => {
    
    //beforeEach??
    beforeEach((done) => {
        this.topic;
        this.post
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: "A list of Favorites",
                description: "A compilation of favorite lists"
            })
            .then((topic) => {
                this.topic = topic;

                Post.create({
                    title: "My favroite books",
                    body: "The Name of the Wind",
                    topicId: this.topic.id
                })
                .then((post) => {
                    this.post = post;
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
        it("should create a topic with a title and description", (done) => {
            Topic.create({
                title: "Favorite TV Shows",
                description: "A list of favorite shows of TV",
                topicId: this.topic.id
            })
            .then((topic) => {
                expect(topic.title).toBe("Favorite TV Shows");
                expect(topic.description).toBe("A list of favorite shows of TV");
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("#getPosts()", () => {
        it("should create and return post objects associated with topic", (done) => {
            Post.create({
                title: "Game of Thrones",
                body: "Valar Morghulis",
                topicId: this.topic.id
            })
            .then((newPost) => {
                expect(this.topic.topicId).toBe(this.post.id);
                this.topic.setPost(newPost)
                .then((topic) => {
                    expect(topic.topicId).toBe(newPost.id);
                    done();
                });
            })
            this.post.getPosts()
            .then((associatedPost) => {
                expect(associatedPost.title).toBe("A list of Favorites");
                done();
            });
        });
    });
})