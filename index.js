var express = require("express");
//second argument in requiring stripe is the secret key
var stripe = require("stripe")("sk_test_l9FkFkulSFGTkSEDUqKleUCR");
var hbs = require("hbs");
var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
    res.render("index", {

    });
});

app.post('/paid', function (req, res) {
    res.render("paid", {

    });
});

//this is the route used to actually charge the user
app.post('/charge', function (req, res) {
    console.log(req.body); //logs object sent back by submitting payment form in the console
    var token = req.body.stripeToken;
    //this amount should be verified further by connecting to our database and making sure the amount
    //that they're being charged matches with what they actually owe to prevent people from manipulating it
    var chargeAmount = 30000;

    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: "usd",
        source: token
        }, function(err, charge){
            if(err){
                console.log(err);
            }
        }
    );
    console.log("payment successful");
    res.render("paid");
});

app.listen(3000, function() {
    console.log("stripe is running");
});