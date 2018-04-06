const express = require('express');
const request = require('request');
const logger = require('morgan');
const bodyParser = require('body-parser');
const async = require('async');
const expressHbs = require('express-handlebars');

const app = express();

app.engine('.hbs', expressHbs({defaultLayout:'layout',extname: '.hbs'}));
app.set('view engine','hbs');

app.use('/public',express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(logger('dev'));



app.get('/',(req,res)=>{
    res.render('main/home');
});

app.post('/',(req,res)=>{
   addEmailtomailchimp(req.body.email);
   res.redirect('/');
    
});

function addEmailtomailchimp(email){
    var options = {
        method: 'POST',
        url: 'https://us18.api.mailchimp.com/3.0/lists/{id}/members',
        headers:
            {
                'Postman-Token': 'token',//add token
                'Cache-Control': 'no-cache',
                Authorization: 'Basic {apikey}',
                'Content-Type': 'application/json'
            },
        body: { email_address: email , status: 'subscribed' },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}

app.listen(3000,()=>{
    console.log('server running on port 3000');
});



