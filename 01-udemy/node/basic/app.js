/**
const http = require("http");

function handleRequest(request, response) {
    if (request.url === "/currenttime") {
        response.statusCode = 200;
        response.end("<h1>" + new Date().toISOString() + "</h1>");
    } else if (request.url === "/") {
        response.statusCode = 200;
        response.end("<h1>Hello World!</h1>");
    }
}

const server = http.createServer(handleRequest);

server.listen(3000);
 */
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));


app.get("/currenttime", function (req, res) {
    res.send("<h1>" + new Date().toISOString() + "</h1>");
});

app.get("/", function (req, res) {
    res.send(`
        <form action="/store-user" method="POST">
            <lable>Your Name</lable>
            <input type='text'name="username"/>
            <button>Submit</button>
        </form>
    `);
});

app.post("/store-user", function (req, res) {
    const userName = req.body.username; // name속성이 username인 input의 내용을 저장

    // 데이터를 저장할 json파일 탐색
    // __driname = 절대 경로
    const filePath = path.join(__dirname, "data", "users.json");
    // 파일 읽기
    const fileData = fs.readFileSync(filePath);
    // 읽은 파일을 저장하기 쉽게 객체로 변환
    const existingUsers = JSON.parse(fileData);

    // 파일 내용 넣기
    existingUsers.push(userName);

    // 파일 내용을 문자열로 변환 후 저장
    fs.writeFileSync(filePath, JSON.stringify(existingUsers));

    res.send("<h1>유저 내임 저장!</h1>");
});
app.get("/users", function (req, res) {
    const filePath = path.join(__dirname, "data", "users.json");

    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);

    let responseData = "<ul>";

    for (const user of existingUsers) {
        responseData += '<li>' + user + '</li>'
    }

    responseData += "</ul>"

    res.send(responseData);
});
app.listen(3000);

/**
 * 1. form내용 저장
 * 2. 파일 읽기
 * 3. 파일을 객체로 변환
 * 4. 객체에 form내용 넣기
 * 5. 객체를 문자열로 변환
 * 6. 파일 정장
 */
