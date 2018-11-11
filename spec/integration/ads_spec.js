const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisement/";

const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisement", () => {

    beforeEach((done) => {
        this.advertisement;
        sequelize.sync({force: true}).then((res) => {
            Advertisement.create({
                title: "Just do it",
                description: "not my ad"
            })
            .then ((advertisement) => {
                this.advertisement = advertisement;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe("GET /ads", () => {
        it("should return a status code 200 and all ads", (done) => {
            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Ads");
                expect(body).toContain("Just do it");
                done();
            });
        });
    });

    describe("GET /ads/new", () => {
        it("should render a new ad card", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Ad");
                done()
            });
        });
    });

    describe("POST /ads/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "Nike",
                description: "Just do it"
            }
        };
  
        it("should create a new ad and redirect", (done) => {
            request.post(options,
                (err, res, body) => {
                    Advertisement.findOne({where: {title: "Nike"}})
                    .then((advertisement) => {
                        expect(res.statusCode).toBe(303);
                        expect(advertisement.title).toBe("Nike");
                        expect(advertisement.description).toBe("Just do it");
                        done();
                    })
                    .catch((err) => {
                        console.log(err);
                        done();
                    });
                }
            );
        });
    });

    describe("GET /ads/:id", () => {
        it("should render a view with the selected ad", (done) => {
            request.get(`${base}${this.advertisement.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Nike");
                done();
            });
        });
    });

    describe("POST /ads/:id/destroy", () => {
        it("should delete the ad with the associated id", (done) => {
            Advertisement.all()
            .then((advertisement) => {
                const adCountBeforeDelete = advertisement.length;
                expect(adCountBeforeDelete).toBe(1);

                request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
                    Advertisement.all()
                    .then((advertisement) => {
                        expect(err).toBeNull();
                        expect(advertisement.length).toBe(adCountBeforeDelete - 1);
                        done();
                    })
                });
            });
        });
    });

});