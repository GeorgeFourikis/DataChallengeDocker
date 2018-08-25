const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID;
const mongo = require('../config/db');

mongo.connectToServer((err) => {
    if (err) throw err

    const db = mongo.getDb()

    //Getting All the records from the Database
    router.get("/", (req, res) => {
        // res.send("hello")
        db.collection('data').find({}).toArray((err, data) => {
            data.forEach((rec) => {
                rec.start_date = new Date(rec.start_date)
                rec.end_date = new Date(rec.end_date)
                db.collection('data').save(rec)
            })
            if (err) throw err
            // console.log(data[0]._id)
            res.render('index', {
                data
            })
        })
    })

    //Getting All the records from the Database
    router.get("/records", (req, res) => {
        console.log(req.query)
        const sDate = new Date(req.query.startingDate)
        const eDate = new Date(req.query.endingDate)

        console.log(sDate + " " + eDate)
        db.collection('data').find({
            start_date: {
                $gte: sDate
            },
            end_date: {
                $lte: eDate,
                $gte: sDate
            }
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort the cities
    router.get("/records/sortCity", (req, res) => {
        db.collection('data').find({}).sort({
            'city': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort the cities DEC
    router.get("/records/sortCityDec", (req, res) => {
        db.collection('data').find({}).sort({
            'city': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by start date
    router.get("/records/sDateSort", (req, res) => {
        db.collection('data').find({}).sort({
            'start_date': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by start date DEC
    router.get("/records/sDateSortDec", (req, res) => {
        db.collection('data').find({}).sort({
            'start_date': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by end date
    router.get("/records/eDateSort", (req, res) => {
        db.collection('data').find({}).sort({
            'end_date': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by end date DEC
    router.get("/records/eDateSortDec", (req, res) => {
        db.collection('data').find({}).sort({
            'end_date': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by price
    router.get("/records/priceSort", (req, res) => {
        db.collection('data').find({}).sort({
            'price': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by price DEC
    router.get("/records/priceSortDec", (req, res) => {
        db.collection('data').find({}).sort({
            'price': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by status
    router.get("/records/statusSort", (req, res) => {
        db.collection('data').find({}).sort({
            'status': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by status DEC
    router.get("/records/statusSortDec", (req, res) => {
        db.collection('data').find({}).sort({
            'status': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by color
    router.get("/records/colorSort", (req, res) => {
        db.collection('data').find({}).sort({
            'color': 1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Sort by color DEC
    router.get("/records/colorSortDec", (req, res) => {
        db.collection('data').find({}).sort({
            'color': -1
        }).toArray((err, data) => {
            if (err) throw err
            res.render('index', {
                data
            })
        })
    })

    //Getting the record using the id
    router.get("/record/:id", (req, res) => {
        const record_id = req.params.id
        console.log(`ObjectId(${record_id})`)
        db.collection('data').findOne({
            _id: ObjectId(record_id)
        }, (err, data) => {
            if (err) throw err
            console.log(Object.keys(data))
            res.render('edit', {
                data
            })
        })
    })

    //Updating the record using the id
    router.post("/record/:id/edit", (req, res) => {
        const record_id = req.params.id
        const myRecord = {
            _id: ObjectId(record_id)
        }
        const myObj = {
            city: req.body.city,
            price: req.body.price,
            status: req.body.status,
            color: req.body.color
        }
        db.collection('data').updateOne(myRecord, {
            $set: myObj
        }, (err, data) => {
            if (err) throw err
        })
        res.redirect("/")
    })

    //Deleting the Record
    router.post("/record/:id/delete", (req, res) => {
        const record_id = req.params.id
        const myRecord = {
            _id: ObjectId(record_id)
        }
        db.collection('data').remove(myRecord, (err, data) => {
            if (err) throw err
            console.log(data)
        })
        res.redirect("/")
    })
})


module.exports = router