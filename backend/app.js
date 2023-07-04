const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoute')
const cors = require('cors')
const app = express();

app.use(cors(

    {
        origin: ["https://leaderboard-ivory.vercel.app/"],
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
    }
))

app.all('/*', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    next();
});

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/leaderboard', userRouter);

app.all('*', (req, res, next) => {
    next(`can't find ${req.originalUrl} on this server !`);
});

module.exports = app;