const mongodb = require('mongodb');
const createmongodb = function (dbname, dbhost, dbport) {
    const client = new mongodb.MongoClient('mongodb://' + dbhost + ':' + dbport, { useUnifiedTopology: true });

    client.connect((err) => {
        if (!err) {
            console.log('connection created');
        }
        const newDB = client.db(dbname);
        newDB.createCollection("masterdata");
        newDB.createCollection("admin");
        newDB.createCollection("user");
        newDB.createCollection("faqs");
        newDB.createCollection("news");
        newDB.createCollection("events");
        newDB.createCollection("personalinformation");

    })

}
module.exports = {
    createmongodb,

}
// createmongodb("titan", "18.190.14.5", "1000")