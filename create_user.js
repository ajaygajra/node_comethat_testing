var request = require("request");
var j = 5;

let apiKeys = [
    {
        "apiKey": "133bebd4f695509f5a065be54f4e1112247664b9",
        "name": "API Key with full access scope",
        "scope": "fullAccess",
        "createdAt": 1571205356
    },
    {
        "apiKey": "22773f4c002123ae38ab8d75428481f05e300df3",
        "name": "test key3",
        "scope": "fullAccess",
        "createdAt": 1571209552
    },
    {
        "apiKey": "356a1f6c4f632839f844be49ffb4941c3c653d3b",
        "name": "test-key2",
        "scope": "fullAccess",
        "createdAt": 1571209544
    },
    {
        "apiKey": "79d8e06c71d5340fa860e15670a147e6fa3a975b",
        "name": "test-key4",
        "scope": "fullAccess",
        "createdAt": 1571209561
    },
    {
        "apiKey": "d5ab2664c0f53ca2aab256ce1aefb8ff44fadb0e",
        "name": "test key-1",
        "scope": "fullAccess",
        "createdAt": 1571209535
    },
    {
        "apiKey": "f8a9686aa0616c9eef310d99c7d72e59dabc713e",
        "name": "API Key with auth only scope",
        "scope": "authOnly",
        "createdAt": 1571205356
    }
]


let k = 0;
for (let i = 200000; i < 300000; i++) {

    let apikey = "133bebd4f695509f5a065be54f4e1112247664b9";
    k++;
    if (k == 6) { k = 0; } else { apikey = apiKeys[k]['apiKey'] }

    setTimeout(function () {
        /* for (let i = 10; i < 20; i++) {
            let process = fork("./login.js");
        } */

        let body = { "uid": "testuser" + i, "name": "Demo User " + i, "email": "a@i.com" }
        let uid = "testuser" + i;
        var options = {
            method: 'POST',
            url: 'https://api-eu.cometchat-dev.com/v2.0/users?debug=true',
            headers: {
                appid: '813224618a2bc',
                apikey: apikey,
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(body)
        };
        request(options, function (error, response, body) {
            if (error) {
                let writer = csvWriter({ sendHeaders: false })
                writer.pipe(fs.createWriteStream('out1.csv', { flags: 'a' }));
                writer.write({ error: error, uid: uid });
                writer.end();
            }
            console.log({ body });
        });
        // }
        console.log(j);
    }, j += 10)

}