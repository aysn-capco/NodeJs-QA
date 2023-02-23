const expect = require("chai").expect;
let request = null;
let response = null;
let serverURL = "http://localhost:3000";

///////////////////////////////////////////////////////////////////////////////////////////////////////////
describe("GET /cards", () => {

  beforeEach(() => {
    request = require("supertest")(serverURL);
  });

  afterEach(() => {
    request = null;
    response = null;
  });

  it("returns all cards", async () => {
    response = await request.get("/api/cards");

    expect(response.status).to.eql(200);
    expect(response.body).to.be.instanceOf(Array);
    expect(response.body.length).to.be.greaterThan(0);
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
describe("Post a api/card", () => {
  let query = {
    name: "name",
    pan: "79927398713",
    limit: "23432",
    balance: 0

  };

  beforeEach(() => {
    request = require("supertest")(serverURL);
  });

  afterEach(() => {
    request = null;
    response = null;
  });

  it("add a card", async () => {
    response = await request.post("/api/card")
      .set('Content-type', 'application/json')
      .send({ ...query })
      .expect(201);
    console.log(response.body);
    expect(response.status).to.eql(201);
    expect(response.body.error).to.eql(false);

  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////

describe("Update a api/card", () => {
  let testId = ""
  let query = {
    id: testId,
    name: "name update",
    pan: "79927398713",
    limit: "23432",
    balance: 0

  };

  beforeEach(async () => {
    request = require("supertest")(serverURL);
    let initResponse = await request.get("/api/cards");
    query = { ...query, id: initResponse.body[0].id }
  });

  afterEach(() => {
    request = null;
    response = null;
  });

  it("update an existing card", async () => {
    response = await request.put("/api/card")
      .set('Content-type', 'application/json')
      .send({ ...query })
      .expect(202);
    expect(response.status).to.eql(202);
    expect(response.body.error).to.eql(false);
    expect(response.body.card).to.eql(query);

  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
describe("delete a api/card/:id", () => {

  let id = "";

  beforeEach(async () => {
    request = require("supertest")(serverURL);
    let initResponse = await request.get("/api/cards");
    id = initResponse.body[0].id;
  });

  afterEach(() => {
    request = null;
  });

  it("delete an existing card", async () => {
    const response = await request.delete(`/api/card/${id}`)
      .set('Content-type', 'application/json')
      .expect(202);
    expect(response.status).to.eql(202);
    expect(response.body.error).to.eql(false);

  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////