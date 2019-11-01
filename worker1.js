"use strict";
exports.__esModule = true;
var window = require("browser-env");
var node_fetch_1 = require("node-fetch");
window({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
window["fetch"] = node_fetch_1["default"];
var chat_1 = require("@cometchat-pro/chat");
function test() {
    var test = new chat_1.CometChat.TextMessage("", "", "");
    console.log(test);
    
    console.log(test.getSender());
}
exports.test = test;
test();
