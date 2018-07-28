const express = require('express')
const { ckfinderRouter } = require('./routes/ckfinder.route');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));
app.use('/', ckfinderRouter);

app.listen(3000, () => console.log('App run on port 3000!'));
