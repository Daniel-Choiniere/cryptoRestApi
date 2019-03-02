// this is where we will create all of our routes for our restAPI

// use express routes class
const express = require('express');

// we can mount our route handlers onto this router
const router = express.Router();

// we need to get the Crypto model from our schema file
const Crypto = require('../models/cryptos')

            // GET ROUTES
// GET route, get a list of all the cryptocurrencies from the database
router.get('/cryptos/', function(req, res, next){
    // if we want to find and return a list of all of the cryptos
    // find the cryptos, then once they are found perform this callabck function
    Crypto.find({}).then(function(cryptos){
        res.send(cryptos);
    });
}); 

// GET route, if we want to find a specific cryptocurrency in the database
router.get('/cryptos/:id', function(req, res, next){
    Crypto.findById({_id: req.params.id}, req.body).then(function(crypto){
            res.send(crypto);
    });
});    

// POST route, add a new crypto to the database
router.post('/cryptos', function(req, res, next){
    // create a new instance of a crypto record 
    // get the data off the body of the request 
    // saves and sends the crypto to the cryptos database
    //  "then" use a JS promise to wait for the crypto to be completley created before the function moves on and sends the crypto to the database 
    Crypto.create(req.body).then(function(crypto){
        // sends a JSON response  back to the user who requested the information so they have a confirmations that data is in the database
        res.send(crypto);
        // if an error is found (i.e. no required name property sent with db data) it will catch it and run the next function
    }).catch(next);
});

// update existing data (a cryptocurrency) in the database
router.put('/cryptos/:id', function(req, res, next){
    // find the crypto by the id that the user passes in
    // update crypto in database with user provided data found in req.body object parameters
    // a promise is returned (with the crypto parameter) that only when the requested id user is found and updated, can the function fire
    Crypto.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        // refind the new ninja just updated and send that 
        Crypto.findOne({_id: req.params.id}).then(function(crypto){
        res.send(crypto);
        });
    });
});

// delete a crypto from the database
router.delete('/cryptos/:id', function(req, res, next){
    // using this mongoose method it will find the specified id (i.e. req.params.id) and return a promise (.then) that will return to us the removed ID (which we can use as a parameter) and fire a function only once the id is found and removed. 
    Crypto.findByIdAndRemove({_id: req.params.id}).then(function(crypto){
        // send back to the user the ID (i.e. crypto) that has been removed
        res.send("HEllo there" + crypto);
    });
});

// we need to export the file to be able to use the code (route handlers) in a seperate file
// the router is what is needed to be passed (exported)
// the file will need to be imported in each necessary subsuquent file
module.exports = router;