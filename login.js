import { expose } from "threads/worker"
 
expose(function login(uid) {

let window = require("browser-env")({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
let fetch = require("node-fetch");
let CometChat = require("@cometchat-pro/chat").CometChat;
window.fetch = fetch;
global.fetch = fetch;
const appId = "7405159b5b40aa", uidString = uid, apiKey = "06ed78bbe40340a7bc06ecb23cc4f71ca801d91d";

CometChat.init(appId).then(
    () => {
        console.log("Initialization completed successfully");
        var UID = uidString;

        CometChat.login(UID, apiKey).then(
            user => {
                console.log("Login Successful:", { user });
            },
            error => {
                console.log("Login failed with exception:", { error });
            }
        );
    },
    error => {
        console.log("Initialization failed with error:", error);
        // Check the reason for error and take appropriate action.
    }
);
});