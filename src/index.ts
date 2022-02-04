import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const PORT = 12990;
const app = express();

app.get('/api/', (req, res) => {
   res.json('Hello from server');
});

app.get('/api/with-3rd-party', async (req, res) => {
   const apiResponse = await axios(process.env.EXTERNAL_API_URL);
   res.json(`Hello from server, your request was ${apiResponse.data ? 'accepted' : 'rejected'} with 3rd party.`);
});

app.listen(PORT, () => console.log(`App running on ${PORT}`));
