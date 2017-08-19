const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require ('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe' ,requireLogin, (req, res) => {

        // console.log(req.body);
        if(!req.user){
            return res.status(401).send({error: 'you must log in!'})
        }
        const charge =  stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        //console.log(charge);
        req.user.credits +=5;
       const user =  req.user.save();
       res.send(user);
    })
};

