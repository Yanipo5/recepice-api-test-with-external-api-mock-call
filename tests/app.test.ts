import _axios from 'axios';
import { ChildProcess } from 'child_process';
import { mock } from '../utils/mock';
import { server } from '../src/app';

/**
 * This recepice simplify starting an app that calls to a 3rd-party.
 * The 3rd-party response is mocked via the mock function.
 * This example shows how the server response is effected by the mock.
 */
let _process: ChildProcess;
const appPort = Number(process.env.PORT) || 12990;
const mockPort = 12999;
const url = '/api/greet/mock';

const axios = _axios.create({ baseURL: `http://localhost:${appPort}` });

describe('Integration Tests', () => {
  test('Api with 3rd party call accepted', async () => {
    _process = await mock([{ response: true }], { port: mockPort });
    const res = await axios.get(url);
    expect(res.data).toBe(`Hello from server, mock server accepted the request.`);
  });

  test('Api with 3rd party call accepted', async () => {
    _process = await mock([{ response: false }], { port: mockPort });
    const res = await axios.get(url);
    expect(res.data).toBe(`Hello from server, mock server rejected the request.`);
  });

  afterEach(() => _process?.kill());

  afterAll(async () => {
    await new Promise(r => server.close(r));
  });
});
