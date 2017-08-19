const express = require('express');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/user');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.json());
app.use(cookieSession({
    //cookie lasts for 30 days
    maxAge : 30 * 24 * 60 * 60  * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production') {

app.use(express.static('client/build'));
    const path = require('path');
    app.get('*',(req,res)=> {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'))
    })
}

console.log("server started");

const PORT = process.env.PORT || 5000;
app.listen(PORT);
app.run(host="0.0.0.0", port=PORT);

//https://accounts.google.com/o/oauth2/v2/auth?
// response_type=code&
// redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fauth%2Fgoogle%2Fcallback&
// scope=profile%20email&
// client_id=143064507706-n1hm3ei3a7nvrhe0b2bkqn2h6ngjniq2.apps.googleusercontent.com
//https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=642936545271-cgfd83achmsfqi3rkbf5fdgd1us19fk3.apps.googleusercontent.com&as=-715fdac8c30de001&destination=http%3A%2F%2Flocalhost%3A5000&approval_state=!ChR3V3VNeU9mYTVFSHBBM2phUm5aaBIfdzJwT0Ixa0FqbzhZVU9xWmlfQjdtUjhFR3hDYzNoVQ%E2%88%99ADiIGyEAAAAAWZU5LmEwoI2Rhly7-xTreQXaLa_NQB0u&xsrfsig=AHgIfE-3qRgpKF7p6Hj0ff_9SvyVZeIjnA&flowName=GeneralOAuthFlow
//https://agile-bayou-65260.herokuapp.com
//https://radiant-springs-85354.herokuapp.com