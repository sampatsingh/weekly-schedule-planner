const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Import your Express server from server.js
const expect = chai.expect;

chai.use(chaiHttp);

describe("Appointments API", () => {
  it("should create a new appointment", (done) => {
    chai
      .request(app)
      .post("/appointments")
      .send({
        title: "Doctor's Appointment",
        date: "2023-12-31T14:30:00",
        description: "Annual check-up",
      })
      .end((err, res) => {
        // Assertion 1: Check the HTTP response status code
        expect(res).to.have.status(201);

        // Assertion 2: Check the response body is an object
        expect(res.body).to.be.an("object");

        // Assertion 3: Check the 'title' property in the response body
        expect(res.body).to.have.property("title", "Doctor's Appointment");

        done(); // Signal that the test is complete
      });
  });
});
