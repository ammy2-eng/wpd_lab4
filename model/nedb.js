const Datastore = require('nedb');

class DAO {
    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new Datastore({ filename: dbFilePath, autoload: true });
            console.log("conected to : " + dbFilePath);


        } else {
            this.db = new Datastore();
            console.log('db running in memory');
        }



    }

    init() {

        this.db.insert({

            title: 'like',
            content: 'I liked the food',
            published: '18/2/2020'
        });
        console.log('new entry in the db');
    }

    all() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('promises rejected');
                } else {
                    resolve(entries);
                    console.log('promise resolved');
                }
            })
        })
    }
}

module.exports = DAO;