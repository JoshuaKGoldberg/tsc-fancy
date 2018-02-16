import { ChildProcess, exec } from "child_process";

import { ExecTscOptions } from "./options";
import { applyReplacements } from "./replacers";

/**
 * Creates a child tsc process.
 *
 * @param options   Options to exec tsc.
 * @returns Spawned tsc child process.
 */
export const execTsc = (options: ExecTscOptions): ChildProcess => {
    const tsc = options.tsc === undefined
        ? "tsc"
        : options.tsc;
    const args = options.args.length === 0
        ? ""
        : ` ${options.args.join(" ")}`;
    const childProcess = exec(`${tsc}${args}`);

    childProcess.stderr.on("data", (data: string | Buffer) => {
        data = applyReplacements(data.toString(), options.replacers);
        process.stdout.write(data);
    });

    childProcess.stdout.on("data", (data: string | Buffer) => {
        data = applyReplacements(data.toString(), options.replacers);
        process.stderr.write(data);
    });

    return childProcess;
};
