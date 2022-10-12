const jwt = require('jsonwebtoken'); // auth
const jwksClient = require('jwks-rsa'); // auth

// This is a special function for express called "Middleware"
// We can simply "use()" this in our server
// When a user is validated, request.user will contain their information
// Otherwise, this will force an error

const client = jwksClient({
    // this url comes from your app on the auth0 dashboard
    jwksUri: process.env.JWKS_URI,
});
// =============== HELPER METHODS, pulled from the jsonwebtoken documentation =================== //
//                 https://www.npmjs.com/package/jsonwebtoken                                     //

// Define a client, this is a connection to YOUR auth0 account, using the URL given in your dashboard


// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(request, response, next) {

    function valid(err, user) {
        request.user = user;
        next();
    }


    // const kid = process.env.AUTH0_CLIENT_SECRET;
    // const key = await client.getSigningKey(kid);
    // const signingKey = key.getPublicKey();

    try {
        const token = request.headers.authorization.split(' ')[1];
        jwt.verify(token, getKey, {}, valid);
    } catch (error) {
        next('Not Authorized');
    }
}





module.exports = verifyUser;