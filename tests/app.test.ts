import _axios from 'axios';
import { ChildProcess } from 'child_process';
import { mock } from '../utils/mock';

let _process: ChildProcess;
const port = 12990;
const axios = _axios.create({ baseURL: `http://localhost:${port}` });

describe('Integration Tests', () => {
  test('Api with 3rd party call accepted', async () => {
    const response = 'Hello from server, your request was accepted with 3rd party.';
    const url = '/api/with-3rd-party';
    _process = await mock([{ response, url }], { port });
    const res = await axios(url);
    expect(res.data).toBe(response);
  });

  afterEach(() => _process?.kill());
});
