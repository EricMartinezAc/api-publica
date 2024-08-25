const chai = require("chai");
const sinon = require("sinon");
const supertest = require("supertest");
const express = require("express");
const axios = require("axios");
const router = require("../path-to-your-router-file"); // Ajusta la ruta al archivo de tu router

const { expect } = chai;
const app = express();
app.use("/api", router);

describe("GET /api/nasa-api", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("should return a list of images for a valid planet", async () => {
    const mockResponse = {
      data: {
        photos: [
          {
            date: "2024-04-01T00:00:00Z",
            url: "http://example.com/image1.jpg",
          },
          {
            date: "2024-04-02T00:00:00Z",
            url: "http://example.com/image2.jpg",
          },
        ],
      },
    };

    axiosGetStub.resolves(mockResponse);

    const response = await supertest(app).get("/api/nasa-api?planet=mars");

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array").that.is.not.empty;
    expect(response.body[0])
      .to.have.property("date")
      .that.equals("2024-04-01T00:00:00Z");
    expect(response.body[0])
      .to.have.property("url")
      .that.equals("http://example.com/image1.jpg");
  });

  it("should return a 400 error if the planet parameter is missing", async () => {
    const response = await supertest(app).get("/api/nasa-api");

    expect(response.status).to.equal(400);
    expect(response.body)
      .to.have.property("error")
      .that.equals('Falta el parámetro "planet"');
  });

  it("should return a 500 error if the NASA API request fails", async () => {
    axiosGetStub.rejects(new Error("API request failed"));

    const response = await supertest(app).get("/api/nasa-api?planet=mars");

    expect(response.status).to.equal(500);
    expect(response.body)
      .to.have.property("error")
      .that.equals("Failed to fetch data from NASA API");
  });
});
