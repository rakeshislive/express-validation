const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { body, validationResult, matchedData } = require('express-validator');


// all environments
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/user', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome',
        status: res.statusCode
    })
})

app.get('/login', (req, res, next) => {
    res.status(200).render('login', {
        message: "User Login Page",
        user: '',
        status: res.statusCode,
        error: ''
    })
})

app.post('/login', [

    body('name').not().isEmpty().withMessage('Name is required').isLength({min: 5, max: 20}).withMessage("Name must have greater than 5 and less then 20 character").trim(),
    body('email').not().isEmpty().withMessage("EMail is required").isEmail().withMessage("Email must follow email pattern").trim()

], (req, res, next) => {
    const errors = validationResult(req);
    const user = matchedData(req);
    if (!errors.isEmpty()) {
        res.status(200).render('login', {
            message: 'Hello',
            user: user,
            status: res.statusCode,
            error: errors.mapped()
        })
    } else {
        res.status(200).render('index', {
            message: 'Welcome ' + user.name + '!',
            user: user,
            error: errors.mapped()
        })
    }
})

app.listen(3000, (err, result) => {
    console.log("Server Connected");
})