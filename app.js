const express = require("express");
const bodyParser = require("body-parser");
const http = require ("https");
const dataContent = require(__dirname + "/data.js");

const app = express();
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) { 
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.eMail;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data); 

        const dataSecret =dataContent.dataCall();

        const url = dataSecret.url + dataSecret.identity;

        const options = {
            method: "POST",
            auth: "bekir25:" + dataSecret.apıkey
        }

        const request =http.request(url, options, function (response) {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html")
            }
            else {
                res.sendFile(__dirname + "/failure.html")
            }

            response.on("data", function (data) {
            });
        });
        request.write(jsonData);
        request.end();

    });

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(3000 || process.env.POST, function () {
    console.log("server running on port 3000")
});

