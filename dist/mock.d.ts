/// <reference types="node" />
import { ChildProcess } from 'child_process';
/**
 * @description Spawns a new server for mocking.
 * @returns A child process with a mock server (express)
 */
export declare function mock(apis: Partial<{
    method: string;
    responseType: string;
    response: any;
    url: string;
}>[], server?: Partial<{
    port: number;
}>): Promise<ChildProcess>;
