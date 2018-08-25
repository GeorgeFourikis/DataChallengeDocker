const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
// const data = require('./data.json')

// Connection URL
const url = 'mongodb://mongo:27017';

// Database Name
const dbName = 'smsData';

//Read JSON file
const syncData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
console.log((syncData[0]))

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    if(err){
        console.log(err)
    }

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    const insertData = (db, cb) => {
        const collection = db.collection('data');

        //clear Collection
        collection.remove({})

        collection.insertMany(syncData, (err, res) => {
            if(err){
                console.log(err)
            }else{
                console.log(res)
                cb(res)
            }
        })
    }

    insertData(db, ()=>{
        client.close();
    })
    

});