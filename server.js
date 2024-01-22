const method1 = () => {
  const http = require("http");

  const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // set header content-type -- plain text
    // res.setHeader('Content-type',"text/plain");
    // res.write("This is just a plain text!");
    // res.end();

    // set header content type -- html
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Hello ! How do you do !</h1>"); // writing our content
    res.write("<h1>I'm fine !</h1>");
    res.end();
  });

  server.listen(3000, "localhost", () => {
    console.log("Listening on port 3000");
  });
};

const method2 = () => {
  const fs = require("fs");
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");

    fs.readFile("./views/index.html", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.write(data);
        res.end();
      }
    });
  });

  server.listen("4000", "localhost", () => {
    console.log("listening to the port 4000");
  });
};

const method3 = () => {
  const fs = require("fs");
  const http = require("http");

  const server = http.createServer((req, res) => {
    res.setHeader("content-type", "text/html");

    let path = "./views/";
    switch (req.url) {
      case "/":
        path += "index.html";
        break;
      case "/about":
        path += "about.html";
        res.statusCode = 200;
        break;
      case "/about-me":
        res.setHeader('Location','/about');
        res.statusCode = 301;
        break;
      default:
        path += "404.html";
        res.statusCode = 404;
        break;
    }

    fs.readFile(path, (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  });

  server.listen("3000", "localhost", () => {
    console.log("listening to port 3000");
  });
};
method3();
