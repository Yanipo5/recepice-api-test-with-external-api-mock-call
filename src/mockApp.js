const express = require('express');
const app = express();

const server = JSON.parse(process.argv[2]);
const apis = JSON.parse(process.argv[3]);

apis.forEach(api => {
   app[api.method](api.url, (req, res) => res[api.responseType](api.response));
});
app.listen(server.port, () => process.stdout.write(`MOCK_LISTENING`));
