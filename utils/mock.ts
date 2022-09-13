import { ChildProcess, spawn } from "child_process";
import * as inspector from "inspector";

/**
 * @description Spawns a new server for mocking.
 * @returns A child process with a mock server (express)
 */
export function mock(
   apis: Partial<{
      method: string;
      responseType: string;
      response: any;
      url: string;
   }>[],
   server?: Partial<{ port: number }>
): Promise<ChildProcess> {
   return new Promise(resolve => {
      const serverOps = JSON.stringify(server || { port: 12999 });
      const apisOps = JSON.stringify(
         apis.map(api => ({
            method: "get",
            responseType: "json",
            response: `mock response from mockApp.js`,
            url: "/",
            ...api,
         }))
      );

      const process = spawn(`node`, [`${__dirname}/mockApp.js`, serverOps, apisOps]);

      // Handle error input.
      process.stderr.on("data", (msg: Buffer) => {
         const str = Buffer.from(msg).toString();
         if (!(inspector.url() && str.includes("Debugger attached."))) console.error(`mock stderr: ${str}`);
      });

      // Resolve the promise.
      process.stdout.on("data", (msg: Buffer) => {
         const str = Buffer.from(msg).toString();
         if (str === "MOCK_LISTENING") resolve(process);
         else console.log(`mock stderr: ${str}`);
      });
   });
}
