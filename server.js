const http = require("http");
const port = 8081;

let toDoList = ["Go to the market ", "Buy food ", "Make dinner"];

http
  .createServer((req, res) => {
    // res.writeHead(200,{"content-type":"text/html"});
    // res.write("<h1>NodeJS</h1><h1>NodeJS</h1>");
    // res.end("<p>Hello World</p>");

    const { method, url } = req;
    // console.log(method,url);
    // res.end("Hello World");

    if (url === "/todos") {
      if (method === "GET") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(toDoList.toString());
        res.end("\n GET todos");
      } else if (method === "POST") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(body);
          })
          .on("end", () => {
            body = JSON.parse(body);
            let newTodo = toDoList;
            newTodo.push(body.item);
            console.log(newTodo);
            res.writeHead(200);
            res.end("POST todos");
          });
      } else if (method === "DELETE") {
        let body = "";
        req
          .on("error", (err) => {
            console.log(err);
          })
          .on("data", (chunk) => {
            body += chunk;
            // console.log(body);
          })
          .on("end", () => {
            body = JSON.parse(body);
            let deleteThisItem = body.item;

            // for(let i = 0; i < toDoList.length; i++){
            //   if(toDoList[i] === deleteThisItem){
            //     toDoList.splice(i,1);
            //     break;
            //   }
            // }

            toDoList.find((item, index) => {
              if (item === deleteThisItem) {
                toDoList.splice(index, 1);
              }
            });

            res.writeHead(200);
            res.end("DELETE todos");
          });
      } else {
        res.writeHead(501);
        res.end("Not implemented");
      }
    } else {
      res.writeHead(404, { "content-type": "text/html" });
      res.end("404 Not Found");
    }
  })
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
