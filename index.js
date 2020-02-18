var express = require('express'),
    mustache = require('mustache-express'),
    DAO = require('./model/nedb.js'),
    dbFile = 'database.nedb.db';

var app = express();

app.set('port', process.env.PORT || 3000);

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

let dao = new DAO(dbFile);
dao.init();
//dao.all();
app.get('/guest', function(req, res) {
    dao.all().then((list) => {
        console.log(list);
        res.render('guestbook', {
            heading: 'Guest Book',
            entries: list
        })
    }).catch((err) => {
        console.log('Error:')
        console.log(JSON.stringify(err))

    })
})


app.use(function(req, res) {
    res.status(404);
    res.type('text');
    res.send('404 Not found');


})

app.listen(app.get('port'), function() {
    console.log('server started');

})