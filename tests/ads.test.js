const request = require("supertest");
const express = require("express");
const adRoutes = require("../routes/adRoutes");

// Mock controller functions
jest.mock("../controllers/AdController", () => ({
  getAds: (req, res) => res.status(200).json([{ title: "Test Gig" }]),
  addAd: (req, res) => res.status(201).json({ message: "Ad created" }),
  updateAd: (req, res) => res.status(200).json({ message: "Ad updated" }),
  removeAd: (req, res) => res.status(200).json({ message: "Ad deleted" }),
}));

const app = express();
app.use(express.json());
app.use("/ads", adRoutes);

describe("Ad Routes", () => {
  it("GET /ads should return a list of ads", async () => {
    const res = await request(app).get("/ads");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ title: "Test Gig" }]);
  });

  it("POST /ads should create a new ad", async () => {
    const res = await request(app).post("/ads").send({ title: "New Gig" });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Ad created");
  });

  it("PUT /ads/:id should update an ad", async () => {
    const res = await request(app)
      .put("/ads/123")
      .send({ title: "Updated Gig" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ad updated");
  });

  it("DELETE /ads/:id should delete an ad", async () => {
    const res = await request(app).delete("/ads/123");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ad deleted");
  });
});
