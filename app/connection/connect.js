if (exports.dbcreated != true) {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://root:" + process.env.DBUSER_PASSWORD + "@cluster0.whaz5.mongodb.net/college?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    client.connect(err => {
        if (err) throw err;
        const db = client.db("college");
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
