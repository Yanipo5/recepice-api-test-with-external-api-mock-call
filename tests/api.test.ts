import _axios from "axios";
import { ChildProcess } from "child_process";
import { mock } from "../src/mock";

let _process: ChildProcess = null;
const PORT = 12990;
const axios = _axios.create({ baseURL: `http://localhost:${PORT}` });

describe("Integration Tests", () => {
   test("Regular API Test (no mock required)", async () => {
      const res = await axios("/api/");
      expect(res.data).toBe("Hello from server");
   });

   test("Api with 3rd party call accepted", async () => {
      _process = await mock([{ response: true }]);
      const res = await axios("/api/with-3rd-party");
      expect(res.data).toBe("Hello from server, your request was accepted with 3rd party.");
   });

   test("Api with 3rd party call rejected", async () => {
      _process = await mock([{ response: false }]);
      const res = await axios("/api/with-3rd-party");
      expect(res.data).toBe("Hello from server, your request was rejected with 3rd party.");
   });

   afterEach(() => _process?.kill());
});
