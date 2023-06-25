const express =require("express");
const bodyParser =require("body-parser");
const request =require("request");
const https = require("https")
const dataContent = require(__dirname + "/data.js");

const app = express();
app.use(express.static("public"));  // statik dosyaları kullanmak için.
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {  // kullanıcının girdiği bilgiler
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.eMail;

    const data = { // veri adlı nesne oluşturduk ve kullanıcının bilgilerini girdik.
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data); // data nesnesini json formatına cevirdik bunu mailchimpe gönderebiliriz.

        const dataSecret =dataContent.dataCall();



        const url = dataSecret.url + dataSecret.kimlik;

        const options = {
            method: "POST",
            auth: "bekir25:" + dataSecret.apıkey
        }

        const request = https.request(url, options, function (response) {
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
    console.log("sunucu 3000 portunda çalışıyor .")
});

