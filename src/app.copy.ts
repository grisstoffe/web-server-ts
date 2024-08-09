import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);
    // res.write('Hola mundo');
    // res.writeHead(200, {
    //     'Content-Type': 'text/html',
    // })

    // const data = { name: 'Jhon doe', age: 30, city: "Lima"};
    // res.writeHead
    if (req.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, {
        "Content-Type": "text/html",
      });

      res.end(htmlFile);
      return;
    }

    if (req.url === "/js/app.js") {
      const jsFile = fs.readFileSync("./public/js/app.js", "utf-8");
      res.writeHead(200, {
        "Content-Type": "application/javascript",
      });
      res.end(jsFile);
    }
    if (req.url === "/css/style.css") {
      const cssFile = fs.readFileSync("./public/css/style.css", "utf-8");
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.end(cssFile);
    }
  },
);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
