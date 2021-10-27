const { addAsync } = require('@awaitjs/express');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const path = require('path')

require('dotenv').config();

const controller = (register, routerModules) => {
    const router = addAsync(new express.Router());
    if(routerModules) {
        for(const routerModule of routerModules) {
            router.use(routerModule);
        }
    }
    register(router);
    return router;
}

// var app = express();
const app = addAsync(express())

app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))

if(process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.use(express.static(path.join(__dirname, './client'), { etag: false }));
}

app.use('/api', controller(require('./controllers/routes')))

if(process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, error => {
    if(error) {
        console.log(error);
        process.exit(-1);
        return;
    }

    console.log(`Listening on port=${port} env=${process.env.NODE_ENV}`)
});