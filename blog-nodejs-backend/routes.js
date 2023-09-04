const express = require('express');
const recordRoutes = express.Router();
const dbo = require('./dbConnection');
const mongoose = require('mongoose')
const session = require('express-session');



recordRoutes.route("/blogdata").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("blogdata")
        .find({}).limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});

recordRoutes.route("/services").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("store")
        .find({}).limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});



recordRoutes.route("/:id").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    let collection = await dbConnect.collection("blogdata");
    let query = { _id: mongoose.Types.ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);

});

recordRoutes.route("/blogcomments").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
        .collection("blogcomments")
        .find({}).limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});

recordRoutes.route("/adminpassword").get(async function (req, res) {
    const adminpassword = "akash0326"

    res(adminpassword)
});

// create post
recordRoutes.route("/").post(async (req, res) => {
    let collection = await db.collection("blogdata");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

//update post
recordRoutes.route("/comment/:id").patch( async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };
    const updates = {
        $push: { comments: req.body }
    };

    let collection = await db.collection("posts");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});


// Delete post
recordRoutes.route("/:id").delete( async (req, res) => {
    const query = { _id: ObjectId(req.params.id) };

    const collection = db.collection("posts");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
});

///authentication
recordRoutes.route("/signin").post(async (req, res) => {
    const dbConnect = dbo.getDb();
    debugger;
    let collection = await dbConnect.collection("users");
    let newDocument = req.body;
    newDocument.date = new Date();
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

recordRoutes.route("/:email").get(async function (req, res) {
    const dbConnect = dbo.getDb();
    let collection = await dbConnect.collection("users");
    let query = { _id: mongoose.Types.ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);

});

module.exports = recordRoutes;
