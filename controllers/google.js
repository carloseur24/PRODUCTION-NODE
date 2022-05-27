const {
    google
} = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    '878909291844-8ajgufct89g2a6agu706phvacgkoob5s.apps.googleusercontent.com',
    "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",
    'http://localhost:8181'
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/blogger',
    'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes
});

const login = async (req, res = response) => {
    
}
module.exports= {login}