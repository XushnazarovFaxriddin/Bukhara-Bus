const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const routes = require('./routes/app');
app.use('/', routes);

app.use((req, res, next) => {

    // console.log(req.method);
    // console.log(req.body);
    res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true)

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // to deal with chrome sending an extra options request
    }
    // console.log(req.body)
    next();
});

app.get('/', (req, res) => {
    res.send("Bukhara-Bus loyihamizga xush kelibsiz.");
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Dastur http://localhost:${port} da ishga tushdi`)
})