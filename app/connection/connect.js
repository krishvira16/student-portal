if (exports.dbcreated != true) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = process.env.DB_CONNECTION_STRING;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }); // MongoDB Client instance created

    client.connect(err => {
        if (err) throw err;
        const db = client.db();
        exports.db = db;
        console.log('Connection to database established successfully.');
        process.emit('dbReady');
    });

    process.on('exit', function(code) {
        client.close();
        console.log('Connection to database terminated.');
    });

    exports.dbcreated = true;
}
