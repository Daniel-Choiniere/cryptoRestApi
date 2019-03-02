const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create the cryptoSchema
const cryptoSchema = new Schema({
    cryptocurrencyName: {
        type: String,
        required:[true, 'Name field is required']
    },
    marketCap: {
        type: Number,
    },
    purchasePrice: {
        type: Number,
    }, 
    sellPrice: {
        type: Number,
    }
});
// we will now create our model with one line of code
// this first parameter (crypto) will be the name of our model, typically this is given a capital for the first letter of its name
//  mongoose is going to go ahead and make a db collection called (plural) cryptos
// we want the objects in the collection to be structured on the  cryptoSchema
const Crypto = mongoose.model('crypto', cryptoSchema);

// export our model so it can be used in other files
module.exports = Crypto;