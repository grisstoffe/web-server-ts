"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http2_1 = __importDefault(require("http2"));
const fs_1 = __importDefault(require("fs"));
const server = http2_1.default.createSecureServer({
    key: fs_1.default.readFileSync("./keys/server.key"),
    cert: fs_1.default.readFileSync("./keys/server.crt"),
}, (req, res) => {
    console.log(req.url);
    // res.write('Hola mundo');
    // res.writeHead(200, {
    //     'Content-Type': 'text/html',
    // })
    // const data = { name: 'Jhon doe', age: 30, city: "Lima"};
    // res.writeHead
    if (req.url === "/") {
        const htmlFile = fs_1.default.readFileSync("./public/index.html", "utf-8");
        res.writeHead(200, {
            "Content-Type": "text/html",
        });
        res.end(htmlFile);
        return;
    }
    if (req.url === "/js/app.js") {
        const jsFile = fs_1.default.readFileSync("./public/js/app.js", "utf-8");
        res.writeHead(200, {
            "Content-Type": "application/javascript",
        });
        res.end(jsFile);
    }
    if (req.url === "/css/style.css") {
        const cssFile = fs_1.default.readFileSync("./public/css/style.css", "utf-8");
        res.writeHead(200, {
            "Content-Type": "text/css",
        });
        res.end(cssFile);
    }
});
server.listen(8080, () => {
    console.log("Server running on port 8080");
});
