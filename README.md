## cp-benchmark

Benchmarking options to create child processes from inside an Electron app.

## Results

thread or the main process thread except for `fork` (see below).
The results are the same no matter if the `launch` happens from a worker

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

### launch via fork

- [`fork` doc](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)

#### Main Process forking

```
Node.js v14.17.6
54ms each

Electron: ELECTRON_RUN_AS_NODE
stuck

Electron: using Node.js installed binary
stuck
```

#### Worker forking

```
Node.js v14.17.6
55ms each

Electron: ELECTRON_RUN_AS_NODE
110ms each

Electron: using Node.js installed binary
113ms each
```
