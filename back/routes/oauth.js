var express = require('express');
var router = express.Router();
require('dotenv').config();

const axios = require('axios');
const querystring = require('querystring');

const { jwtDecode } = require('jwt-decode');
const { v7: uuidv7 } = require('uuid');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('oauth', { title: 'Express' });
});


// OAuth 설정
const oauthProviderURL = 'https://accounts.google.com/o/oauth2/v2/auth';
const tokenURL = 'https://oauth2.googleapis.com/token';

//ENV
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
const frontendURL = process.env.FRONTEND_URL;

// 로그인 라우트
router.get('/login', (req, res) => {
    const authorizationURL = `${oauthProviderURL}?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&scope=email profile`;
    console.log(authorizationURL);
    res.redirect(authorizationURL);
});


// 콜백 라우트
router.get('/callback', async (req, res) => {
    console.log('OK. Callback Start');

    const code = req.query.code;

    if(!code) {
        const msg = 'Request params.code Empty';
        console.log(msg);
        res.status(400);
        res.send(msg);
        return;
    }    

    const tokenResponse = await axios.post(tokenURL, querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectURI,
        client_id: clientID,
        client_secret: clientSecret
    }));

    // if(process.env.IS_DEBUG) {
    //     console.log(tokenResponse);
    // }

    // Check Step By Step
    token_data = tokenResponse.data;
    if(!token_data) {
        const msg = 'Google Token Exchange response No "data" attribute';
        console.log(msg);
        res.status(400);
        res.send(msg);
        return;
    }  

    const id_token = token_data.id_token;
    if(!id_token) {
        const msg = 'Google Token Exchange response No "id_token" attribute';
        console.log(msg);
        res.status(400);
        res.send(msg);
        return;
    }

    // This Template Not use access token. just check
    const access_token = token_data.access_token;
    if(!access_token) {
        const msg = 'Google Token Exchange response No "access_token" attribute';
        console.log(msg);
        res.status(400);
        res.send(msg);
        return;
    }


    const id_token_decode = jwtDecode(id_token);
    const user_info = {
        family_name:""
        ,given_name:""
        ,name:""
        ,picture:""
        ,email_verified:""
        ,email:""
    }

    if (id_token_decode.family_name) {user_info.family_name = id_token_decode.family_name}
    if (id_token_decode.given_name) {user_info.given_name = id_token_decode.given_name}
    if (id_token_decode.name) {user_info.name = id_token_decode.name}
    if (id_token_decode.picture) {user_info.picture = id_token_decode.picture}
    if (id_token_decode.email_verified) {user_info.email_verified = id_token_decode.email_verified}
    if (id_token_decode.email) {user_info.email = id_token_decode.email}

    const this_site_token = uuidv7();
    // You must save this_site_token to DBMS or cache(ex, redis) and verify request

    res.redirect(`${frontendURL}/?this_site_token=${this_site_token}&user_info=${encodeURIComponent(JSON.stringify(user_info))}`);
});

module.exports = router;
