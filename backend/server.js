const express = require("express");
const fs = require("fs");

const app = express();
let cachedJSON;
const JSONPath = "./public/courses.json";

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/courses", (req, res) => {
  fs.readFile(JSONPath, "utf-8", (_, jsonString) => {
    try {
      cachedJSON = JSON.parse(jsonString);
    } catch (err) {
      console.log("Error parsing JSON", err);
    }
  });

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const results = {};

  if (page > 0 && limit > 0 && cachedJSON) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    results.pageCount = Math.ceil(cachedJSON.length / limit);

    if (endIndex < cachedJSON.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.results = cachedJSON.slice(startIndex, endIndex);
  } else {
    results.results = cachedJSON;
  }

  res.send(results);
});

function writeToFile(_, res) {
  fs.writeFile(JSONPath, JSON.stringify(cachedJSON, null, 2), (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send(cachedJSON);
    }
  });
}

app.post(
  "/create",
  (req, _, next) => {
    const data = {
      name: req.body.params.name,
      description: req.body.params.description,
      instructor: req.body.params.instructor,
    };

    cachedJSON.push(data);
    next();
  },
  writeToFile
);

app.post(
  "/update/:index",
  (req, _, next) => {
    const index = req.params.index;
    const data = {
      name: req.body.params.name,
      description: req.body.params.description,
      instructor: req.body.params.instructor,
    };

    cachedJSON.splice(index, 1, data);
    next();
  },
  writeToFile
);

app.post(
  "/delete/:index",
  (req, _, next) => {
    const index = req.params.index;
    cachedJSON.splice(index, 1);
    next();
  },
  writeToFile
);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

app.listen(port, () => {
  console.log(`Server started successfuly on port: ${port}`);
});

module.exports = app;
