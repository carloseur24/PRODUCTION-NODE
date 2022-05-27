// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     $("#name").text(profile.getName());
//     $("#email").text(profile.getEmail());
//     $("#image").attr('src', profile.getImageUrl());
//     $(".data").css("display", "block");
//     $(".g-signin2").css("display", "none");
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         alert("You have been signed out successfully");
//         $(".data").css("display", "none");
//         $(".g-signin2").css("display", "block");
//     });
// }

// function init() {
//     gapi.load('auth2', function () {
//         /* Ready. Make a call to gapi.auth2.init or some other API */
//         gapi.auth2.init({
//             client_id: '878909291844-8ajgufct89g2a6agu706phvacgkoob5s.apps.googleusercontent.com'
//         })
//         GoogleAuth.signIn({
//             scope: 'profile email'
//         })
//         options = new gapi.auth2.SigninOptionsBuilder();
//         options.setAppPackageName('com.example.app');
//         options.setFetchBasicProfile(True);
//         options.setPrompt('select_account');
//         options.setScope('profile').setScope('email');
//     });
// }

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