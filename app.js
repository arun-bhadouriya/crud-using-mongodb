const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
const uri = "mongodb://localhost:27017/crud-arun";

async function arun() {
	await mongoose.connect(
		uri,
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
		},
		(err) => {
			if (!err) console.log("connected");
			else console.log(err);
		}
	);
}
arun();

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	contact: String,
	address: String,
});

const User = new mongoose.model("user", UserSchema);

app.use(express.static("public"));

app.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

app.post("/add", async (req, res) => {
	const { name, email, contact, address } = req.body;

	const newUser = { name, email, contact, address };
	console.log("newUser", newUser);
	let user = await User.find();
	user = new User(newUser);

	await user.save();
	res.redirect("/");
});

app.delete("/user/:user_mail", async (req, res) => {
	const user = await User.findOneAndRemove({ email: req.params.user_mail });
	const users = await User.find();
	res.redirect("/");
});

app.post("/user/update/:user_mail/:user_contact", async (req, res) => {
	const update = req.body;
	console.log(req.params);
	console.log(req.body);
	let user = await User.updateOne(
		{
			email: req.params.user_mail,
			contact: req.params.user_contact,
		},
		{ $set: update },
		{
			new: true,
		}
	);
	res.redirect("/");
});

app.listen(3500, (req, res) => {
	console.log(`http://localhost:3500`);
});
