const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Import your Express server from server.js
const expect = chai.expect;
const Appointment = require("../models/Appointment"); // Import the Appointment model

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
        // Assertion 1: Verify the HTTP response status code is 201 (Created)
        expect(res).to.have.status(201);

        // Assertion 2: Ensure the response body is an object
        expect(res.body).to.be.an("object");

        // Assertion 3: Check the 'title' property in the response body
        expect(res.body).to.have.property("title", "Doctor's Appointment");

        done(); // Signal that the test is complete
      });
  });

  it("should retrieve all upcoming appointments", (done) => {
    chai
      .request(app)
      .get("/appointments")
      .end((err, res) => {
        // Assertion 1: Verify the HTTP response status code is 200 (OK)
        expect(res).to.have.status(200);

        // Assertion 2: Ensure the response body is an array
        expect(res.body).to.be.an("array");

        done();
      });
  });

  it("should delete an appointment", (done) => {
    // First, you need to create an appointment for testing the delete operation
    const newAppointment = new Appointment({
      title: "Test Appointment",
      date: "2023-12-31T15:30:00",
      description: "Testing delete operation",
    });

    newAppointment.save((error, savedAppointment) => {
      chai
        .request(app)
        .delete(`/appointments/${savedAppointment._id}`)
        .end((err, res) => {
          // Assertion 1: Verify the HTTP response status code is 200 (OK)
          expect(res).to.have.status(200);

          // Assertion 2: Check the response message
          expect(res.body).to.have.property("message", "Appointment deleted");

          done();
        });
    });
  });
});
