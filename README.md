# `tsc-fancy`
[![Build Status](https://travis-ci.org/JoshuaKGoldberg/tsc-fancy.svg?branch=master)](https://travis-ci.org/joshuakgoldberg/tsc-fancy)
[![npm version](https://badge.fury.io/js/tsc-fancy.svg)](https://www.npmjs.com/package/tsc-fancy)
[![Downloads](https://img.shields.io/npm/dm/tsc-fancy.svg)](https://www.npmjs.com/package/tsc-fancy)

✨ Snazzy utilities around the TypeScript CLI. ✨

```shell
npm install --global tsc-fancy

tsc-fancy
```

_Or for the terse:_

```shell
tscf
```

## What?

Some user-requested features are too esoteric for TypeScript to add them.
That's fine!
We can just stick them here, outside of the main repository. 🔥

Everything passed to the `tsc-fancy` CLI that it doesn't recognize is given directly to `tsc`.
Thus, you can use `tsc-fancy` as a drop-in replacement for `tsc`.

## CLI Flags

### `--preserveConsoleOutput`

Use with `tsc`'s `-w`/`--watch` mode to stop it from clearing the screen on recompiles.
This is useful for tools such as monorepo build aggregators that run multiple `tsc` instances at once.

```shell
> tsc-fancy --preserveConsoleOutput --pretty --watch

[1:23:45 PM] Compilation complete. Watching for file changes.
[1:23:56 PM] File change detected. Starting incremental compilation...
[1:23:56 PM] Compilation complete. Watching for file changes.
```

See [TypeScript#21295](https://github.com/Microsoft/TypeScript/issues/21295).

> `--preserveConsoleOutput` uses `--replace` logic under the hood to remove the console clearing character `\x1Bc` / `\u001bc`.

### `--replace`

Replaces TSC characters with your own.
Each replacement is converted to a `RegExp` with the `/gi` flag.

```shell
> tsc-fancy --replace error "Oh dearest me!" --pretty false

src/file.ts(1,5): Oh dearest me! TS2322: Type '"no"' is not assignable to type 'number'.
src/file.ts(2,5): Oh dearest me! TS2322: Type '"yes"' is not assignable to type 'number'.
```

### `--tsc`

Alias of the tsc executable to [`exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback), if not `"tsc"`.

```shell
> tsc-fancy --tsc ../TypeScript/built/local/tsc.js
```

## Programmatic Usage

This package exposes an `execTsc` method that takes in an options object and returns the spawned [`ChildProcess`](https://nodejs.org/api/child_process.html).

```typescript
import { execTsc } from "tsc-fancy";

execTsc()
    .on("close", (code: number) => {
        console.log("All done! Exit code:", code);
    });
    .on("error", (error: error) => {
        console.log("Oh no! Error:", error);
    });
```

The options object's type is exported as `ExecTscOptions`.

### `args: string[]`

Arguments to directly pass to `tsc`.

```typescript
execTsc({
    args: ["--p", ".", "--watch"],
});
```

> In CLI usage, these are everything not known by `tsc-fancy`.

### `replacers: Map<RegExp, string>`

Regular expressions with text to replace them with.

```typescript
execTsc({
    replacers: new Map([
        [/error/gi, "Oh dearest me!"],
    ]),
});
```

### `tsc: string`

Alias of the tsc executable to [`exec`](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback), if not `"tsc"`.

```typescript
execTsc({
    tsc: "../TypeScript/built/local/tsc.js",
});
```

## Contributing

🙌 See [Contributing.md](./CONTRIBUTING.md). 🙌
