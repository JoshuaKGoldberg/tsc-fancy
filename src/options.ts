/**
 * Options to exec tsc.
 */
export interface ExecTscOptions {
    /**
     * Any args to pass to the executable.
     */
    args: string[];

    /**
     * Regular expressions with text to replace them with.
     */
    replacers: Map<RegExp, string>;

    /**
     * Alias of the executable, if not "tsc".
     */
    tsc?: string;
}

export const parseArgv = (argv: string[]): ExecTscOptions => {
    const options: ExecTscOptions = {
        args: [],
        replacers: new Map<RegExp, string>(),
    };

    let i = 0;
    while (i < argv.length) {
        switch (argv[i]) {
            case "--preserveConsoleOutput":
                options.replacers.set(/\x1Bc/g, "");
                options.replacers.set(/\u001bc/g, "");
                i += 1;
                break;

            case "--replace":
                options.replacers.set(new RegExp(argv[i + 1], "gi"), argv[i + 2]);
                i += 3;
                break;

            case "--tsc":
                options.tsc = argv[i + 1];
                i += 2;
                break;

            default:
                options.args.push(argv[i]);
                i += 1;
        }
    }

    return options;
};
