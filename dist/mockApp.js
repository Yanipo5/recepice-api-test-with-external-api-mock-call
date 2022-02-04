var express = require('express');
var app = express();
var server = JSON.parse(process.argv[2]);
var apis = JSON.parse(process.argv[3]);
apis.forEach(function (api) {
    app[api.method](api.url, function (req, res) { return res[api.responseType](api.response); });
});
app.listen(server.port, function () { return process.stdout.write("MOCK_LISTENING"); });
