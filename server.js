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

//1fe0599152eefc946b6d87119e781317-us18
//https://us18.api.mailchimp.com/3.0/lists/b55981c827/members

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
        url: 'https://us18.api.mailchimp.com/3.0/lists/b55981c827/members',
        headers:
            {
                'Postman-Token': 'aecd218f-155e-4569-b7b9-2bda8192155c',
                'Cache-Control': 'no-cache',
                Authorization: 'Basic YW55c3RyaW5nOjFmZTA1OTkxNTJlZWZjOTQ2YjZkODcxMTllNzgxMzE3LXVzMTg=',
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



