import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const PORT = Number(process.env.PORT) || 12990;
const app = express();

app.get('api/greet/', (req, res) => res.json('Hello from server'));

app.get('/api/greet/mock', async (req, res) => {
  const apiResponse = await axios(process.env.EXTERNAL_API_URL);
  res.json(`Hello from server, mock server ${apiResponse.data ? 'accepted' : 'rejected'} the request.`);
});

export const server = app.listen(PORT, () => console.log(`App running on ${PORT}`));
