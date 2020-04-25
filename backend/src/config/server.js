const express = require("express");
const routes = require("../routes");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use("/", routes());

app.listen(8080, () => console.log("Listening on port 8080!"));
