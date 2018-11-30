const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe ("Topic", () => {
    
    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;

        sequelize.sync({force: true}).then((res) => {
            User.create({
                email: "starman@tesla.com",
                password: "Trekkie4lyfe"
            })
            .then((user) => {
                this.user = user; //store the user
                Topic.create({
                    title: "Expeditions to Alpha Centauri",
                    description: "A compilation of reports from recent visits to the star system.",
                    posts: [{
                        title: "My first visit to Proxima Centauri b",
                        body: "I saw some rocks.",
                        userId: this.user.id
                    }]
                }, {
                    include: {
                        model: Post,
                        as: "posts"
                    }
                })
                .then((topic) => {
                    this.topic = topic; //store the topic
                    this.post = topic.posts[0]; //store the post
                    done();
                })
            })
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