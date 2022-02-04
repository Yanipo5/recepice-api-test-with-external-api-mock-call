# Recepice: Test Api With External Call

This recepice describes a machanisem to test an API whiche calls to an external API. For example calling `/localhost:8080/api/translate` while `/api/translate` calls another 3rd party for the translation (say `google/api/translate`).

## Synopsis

Testing APIs which relays of external api could could hinder the relaiblity if the tests. This recepice is espesually useful if you need to test against an unrelaible 3rd party test server.

## Usage

1. Start your app with with all external apis to pointing to `http://localhost:12999`.
2. Use this (Jest) code template.
3. Replace `response` and `.toBe` with the expected value.
4. Run the test.
5. There is no 5, you are done 😊.

```typescript
import { ChildProcess } from 'child_process';
import { mock } from '../utils/mock';
...
let _process: ChildProcess = null;

describe('Api Tests', () => {
   test('Api with 3rd party call accepted', async () => {
      _process = await mock([{ response: true }]);
      const res = await axios('/api/with-3rd-party');

      // Expect a response that is based on the tested API + the mock response.
      expect(res.data).toBe('Hello from server, your request was accepted with 3rd party.');
   });

   // Kill the mock server ather each test
   afterEach(() => _process?.kill());
}
```

## Concept

The recepice creates a per-test mock server (default port 12999).
This is achived by creating a single usage child_process that spawns a new express server that exists for the duration of the test.
