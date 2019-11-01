const { parentPort } = require('worker_threads');
var csvWriter = require('csv-write-stream')
var writer = csvWriter()
var fs = require('fs');

parentPort.once('message', message => {
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
    const appId = "87877fedb641cf", uidString = message, apiKey = "20da0d71ee2ca8aff1da18b952590e2f45c713c7";

    let initStarted = performance.now();
    var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('us').build();

    CometChat.init(appId, appSetting).then(




        () => {


            var limit = 30;
            var usersRequest = new CometChat.UsersRequestBuilder().setLimit(limit).build();

            usersRequest.fetchNext().then(
                userList => {
                    /* userList will be the list of User class. */
                    console.log("User list received:", userList);
                    /* retrived list can be used to display contact list. */
                },
                error => {
                    console.log("User list fetching failed with error:", error);
                }
            );

            let loginStarted = performance.now();
            console.log("Initialization completed successfully", performance.now() - initStarted);

            var listenerID = "UNIQUE_LISTENER_ID";


            CometChat.addMessageListener(
                listenerID,
                new CometChat.MessageListener({
                    onTextMessageReceived: textMessage => {
                        console.log("Text message received successfully", textMessage.id);
                        // console.log(UID)
                        // console.log({ id: textMessage.id, receiver: textMessage.sender.uid + UID })

                        if (textMessage.sender.uid != UID) {
                            // setTimeout(() => {
                            console.log("sending the receipt", textMessage.id + " user " + UID + " || " + textMessage.sender.uid);
                            CometChat.markAsRead(textMessage.id, textMessage.receiverId, textMessage.receiverType);
                            // }, 10000)

                        }

                        /* let messageReceived = performance.now();
                        var receiverID = "testmuc1";
                        var messageText = "I am message echo" + textMessage.id;
                        var messageType = CometChat.MESSAGE_TYPE.TEXT;
                        var receiverType = CometChat.RECEIVER_TYPE.GROUP;
                        let newTextMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);
                        
                            // if(textMessage.id%1100==0)
                            CometChat.sendMessage(newTextMessage).then(
                                message => {
                                    // let messageSent = performance.now();
                                    // let writer = csvWriter({ sendHeaders: false })
                                    // writer.pipe(fs.createWriteStream('messages.csv', { flags: 'a' }));
                                    // writer.write({ messageid: message.id, timeTosendMessage: messageSent - messageReceived });
                                    // writer.end()
                                    console.log("Message sent successfully:"+ message.getSender().uid, message);
                                },
                                error => {
                                    console.log("Message sending failed with error:", error);
                                }
                            ); */


                    },
                    onMediaMessageReceived: mediaMessage => {
                        console.log("Media message received successfully", mediaMessage);
                        // Handle media message
                    },
                    onCustomMessageReceived: customMessage => {
                        console.log("Custom message received successfully", customMessage);
                        // Handle custom message
                    }

                })
            );


            var UID = uidString;
            console.log(UID);
            CometChat.login(UID, apiKey).then(
                user => {
                    let loginEnded = performance.now();
                    let totalLoginTime = (loginEnded - loginStarted);

                    console.log("Login Successful:", { user: user.uid, totalLoginTime });


                    /* let writer = csvWriter({ sendHeaders: false })
                    writer.pipe(fs.createWriteStream('out.csv', { flags: 'a' }));
                    writer.write({ user: user.uid, login_time: totalLoginTime });
                    writer.end() */
                    setInterval(() => {

                        let receiverID = "four";
                        let messageText = "Hello world!";
                        let messageType = CometChat.MESSAGE_TYPE.TEXT;
                        let receiverType = CometChat.RECEIVER_TYPE.GROUP;

                        let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);



                        CometChat.sendMessage(textMessage).then(
                            message => {
                                /*     let messageSent = performance.now();
                                    let timeTosendMessage = (messageSent - loginEnded);
     
                                    let writerMessage = csvWriter({ sendHeaders: false })
                                    writerMessage.pipe(fs.createWriteStream('messages.csv', { flags: 'a' }));
                                    writerMessage.write({ messageid: message.id, timeTosendMessage });
                                    writerMessage.end() */

                                console.log("Message sent successfully:", message.id);
                            },
                            error => {

                                console.log("Message sending failed with error1:", error);
                            }
                        );
                    }, 1000);



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



