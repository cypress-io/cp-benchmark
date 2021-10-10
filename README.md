## cp-benchmark

Benchmarking options to create child processes from inside an Electron app.

## Results

### launch via `execa`

- [`execa repo`](https://github.com/sindresorhus/execa)

#### Main Process launching

```
Node.js v14.17.6
48ms each

Electron: ELECTRON_RUN_AS_NODE
472ms each

Electron: using Node.js installed binary
433ms each
```

#### Worker launching

```
Node.js v14.17.6
50ms each

Electron: ELECTRON_RUN_AS_NODE
stuck after first launch

Electron: using Node.js installed binary
410ms each
```

### launch via execFile

- [`execFile` doc](https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback)

#### Main Process launching

```
Node.js v14.17.6
51ms each

Electron: ELECTRON_RUN_AS_NODE
stuck

Electron: using Node.js installed binary
460ms each
```

#### Worker launching

```
Node.js v14.17.6
53ms each

Electron: ELECTRON_RUN_AS_NODE
stuck

Electron: using Node.js installed binary
449ms each
```

### launch via fork

- [`fork` doc](https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options)

#### Main Process forking

```
Node.js v14.17.6
54ms each

Electron: ELECTRON_RUN_AS_NODE
489ms each

Electron: using Node.js installed binary
463ms each
```

#### Worker forking

```
Node.js v14.17.6
55ms each

Electron: ELECTRON_RUN_AS_NODE
503ms each

Electron: using Node.js installed binary
477ms each
```
