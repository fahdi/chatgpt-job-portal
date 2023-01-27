const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/submit-form", (req, res) => {
  const formData = req.body;
  console.log(formData);
  // You can add your form data validation or processing logic here
  res.json({ message: "Form submitted successfully" });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
