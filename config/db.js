const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')

const url = 'mongodb://mongo:27017'
const dbName = 'smsData'
let _db;

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



module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, (err, client) => {
            _db = client.db(dbName);
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};