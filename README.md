## cp-benchmark

Benchmarking options to create child processes from inside an Electron app.

## Results

The results are the same no matter if the `launch` happens from a worker
thread or the main process thread.

### launch via `execa`

- [`execa repo`](https://github.com/sindresorhus/execa)

```
Node.js v14.17.6
48ms each

Electron: ELECTRON_RUN_AS_NODE
472ms each

Electron: using Node.js installed binary
460ms each
```

### launch via execFile

- [`execFile` doc](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback)

```
Node.js v14.17.6
48ms each

Electron: ELECTRON_RUN_AS_NODE
stuck

Electron: using Node.js installed binary
53ms each
```
