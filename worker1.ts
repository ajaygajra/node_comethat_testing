import * as window from "browser-env"
import fetch from "node-fetch";


window({
    url: "http://www.runtestcases.com",
    contentType: "text/html",
    includeNodeLocations: true,
    storageQuota: 10000000
});
window["fetch"]=fetch;
import {CometChat} from "@cometchat-pro/chat";

export function test(){
    let test=new CometChat.TextMessage("","","");
    console.log(test);
    console.log(test.getSender());
}    
