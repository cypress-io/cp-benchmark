# Using Multiple Threads

Attempting to use Multiple threads in order to speed up launches did not have the desired
behavior for Electron as the more _parallel_ launches are performed, the more, the longer it
takes for each individual launch to complete synchronously.

I'm including the full log for the case of 3 threads for 6 launches in the first examples, but
further below just the essential parts.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Threads: 3, Launches: 6](#threads-3-launches-6)
  - [Node.js](#nodejs)
  - [Electron Using Node.js Binary to Launch](#electron-using-nodejs-binary-to-launch)
- [Threads: 10, Launches: 20](#threads-10-launches-20)
  - [Node.js](#nodejs-1)
  - [Electron Using Node.js Binary to Launch](#electron-using-nodejs-binary-to-launch-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Threads: 3, Launches: 6

### Node.js

The below shows that processes launch in parallel when multiple worker threads are used to
parallelize the call to `execa`.

```
➝  DEBUG_COLORS=1 DEBUG=* node parallel-launch/app.js
  cp:info Using 3 threads, launching 2 per worker for a total of 6 times +0ms
  cp:info Launching via launch and /usr/local/bin/node /Volumes/d/dev/cy/child-process/benchmarks/print-versions.js +3ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 0 launched  0 after 11.8ms +12ms
  cp:trace worker 1 launched  0 after 12.6ms +13ms
  cp:trace worker 2 launched  0 after 12.5ms +13ms
  cp:trace worker 0 completed 0 40.7ms/52.5ms after launch/start +41ms
  cp:trace worker 0 launching 1 +0ms
  cp:trace worker 0 launched  1 after 4.2ms +4ms
  cp:trace worker 1 completed 0 44.8ms/57.3ms after launch/start +45ms
  cp:trace worker 2 completed 0 47.0ms/59.5ms after launch/start +47ms
  cp:trace worker 1 launching 1 +0ms
  cp:trace worker 1 launched  1 after 4.2ms +4ms
  cp:trace worker 2 launching 1 +0ms
  cp:trace worker 2 launched  1 after 4.5ms +5ms
  cp:trace worker 0 completed 1 45.0ms/49.1ms after launch/start +45ms
  cp:trace worker 1 completed 1 42.5ms/46.7ms after launch/start +43ms
  cp:trace worker 2 completed 1 41.4ms/45.9ms after launch/start +41ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 0 launched  0 after 12.3ms +13ms
  cp:trace worker 1 launched  0 after 13.2ms +14ms
  cp:trace worker 2 launched  0 after 13.5ms +14ms
  cp:trace worker 0 completed 0 39.6ms/51.7ms after launch/start +40ms
  cp:trace worker 0 launching 1 +0ms
  cp:trace worker 0 launched  1 after 3.9ms +4ms
  cp:trace worker 1 completed 0 43.3ms/56.4ms after launch/start +43ms
  cp:trace worker 2 completed 0 44.9ms/58.3ms after launch/start +45ms
  cp:trace worker 1 launching 1 +0ms
  cp:trace worker 1 launched  1 after 3.6ms +4ms
  cp:trace worker 2 launching 1 +0ms
  cp:trace worker 2 launched  1 after 4.6ms +5ms
  cp:trace worker 0 completed 1 44.5ms/48.3ms after launch/start +44ms
  cp:trace worker 1 completed 1 43.7ms/47.3ms after launch/start +43ms
  cp:trace worker 2 completed 1 41.5ms/46.1ms after launch/start +41ms
  cp:info
  cp:info Took a total of
  cp:info 331.921ms for 6 -> 55.320ms each.
  cp:info 103.152ms per 2 - > 51.576ms each +332ms
```

### Electron Using Node.js Binary to Launch

```
$ DEBUG_COLORS=1 DEBUG=* NODE_PATH=/usr/local/bin/node electron parallel-launch/app
  cp:info Using 3 threads, launching 2 per worker for a total of 6 times +0ms
  cp:info Launching via launch and /usr/local/bin/node /Volumes/d/dev/cy/child-process/benchmarks/print-versions.js +3ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 0 launched  0 after 898.5ms +899ms
  cp:trace worker 2 launched  0 after 900.4ms +901ms
  cp:trace worker 1 launched  0 after 901.1ms +901ms
  cp:trace worker 0 completed 0 9.1ms/907.6ms after launch/start +9ms
  cp:trace worker 2 completed 0 334.1ms/1234.5ms after launch/start +334ms
  cp:trace worker 0 launching 1 +1ms
  cp:trace worker 0 launched  1 after 329.9ms +616ms
  cp:trace worker 1 completed 0 624.6ms/1525.6ms after launch/start +625ms
  cp:trace worker 2 launching 1 +1ms
  cp:trace worker 2 launched  1 after 290.3ms +290ms
  cp:trace worker 2 completed 1 283.5ms/573.8ms after launch/start +284ms
  cp:trace worker 1 launching 1 +0ms
  cp:trace worker 1 launched  1 after 284.4ms +285ms
  cp:trace worker 1 completed 1 47.2ms/331.6ms after launch/start +47ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 0 launched  0 after 829.2ms +830ms
  cp:trace worker 2 launched  0 after 830.0ms +831ms
  cp:trace worker 1 launched  0 after 831.2ms +832ms
  cp:trace worker 0 completed 0 6.4ms/835.6ms after launch/start +7ms
  cp:trace worker 2 completed 0 5.9ms/835.9ms after launch/start +6ms
  cp:trace worker 0 launching 1 +0ms
  cp:trace worker 0 launched  1 after 567.7ms +567ms
  cp:trace worker 2 launching 1 +0ms
  cp:trace worker 2 launched  1 after 569.5ms +569ms
  cp:trace worker 1 completed 0 574.4ms/1405.6ms after launch/start +574ms
  cp:trace worker 2 completed 1 287.6ms/857.1ms after launch/start +288ms
  cp:trace worker 1 launching 1 +1ms
  cp:trace worker 1 launched  1 after 288.2ms +288ms
  cp:trace worker 1 completed 1 48.3ms/336.5ms after launch/start +48ms
  cp:info
  cp:info Took a total of
  cp:info 3736.486ms for 6 -> 622.748ms each.
  cp:info 1671.878ms per 2 - > 835.939ms each +4s
```

## Threads: 10, Launches: 20

### Node.js

```
➝  DEBUG_COLORS=1 DEBUG=* node parallel-launch/app.js
  cp:info Using 10 threads, launching 2 per worker for a total of 20 times +0ms
  cp:info Launching via launch and /usr/local/bin/node /Volumes/d/dev/cy/child-process/benchmarks/print-versions.js +4ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 4 launching 0 +0ms
  cp:trace worker 7 launching 0 +0ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 5 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 3 launching 0 +0ms
  cp:trace worker 9 launching 0 +0ms
  cp:trace worker 4 launched  0 after 27.6ms +29ms
  cp:trace worker 8 launching 0 +0ms
  cp:trace worker 1 launched  0 after 27.8ms +29ms
  cp:trace worker 7 launched  0 after 27.9ms +28ms
  cp:trace worker 0 launched  0 after 25.3ms +48ms
  cp:trace worker 5 launched  0 after 24.2ms +36ms
  cp:trace worker 6 launching 0 +0ms
  cp:trace worker 4 completed 0 68.4ms/95.9ms after launch/start +68ms
  cp:trace worker 1 completed 0 68.5ms/96.2ms after launch/start +68ms
  cp:trace worker 7 completed 0 72.5ms/100.5ms after launch/start +73ms
  cp:trace worker 2 launched  0 after 35.7ms +52ms
  cp:trace worker 3 launched  0 after 40.6ms +43ms
  cp:trace worker 4 launching 1 +0ms
  cp:trace worker 4 launched  1 after 33.0ms +34ms
  cp:trace worker 9 launched  0 after 40.4ms +43ms
  cp:trace worker 1 launching 1 +0ms
  cp:trace worker 1 launched  1 after 39.3ms +40ms
  cp:trace worker 7 launching 1 +8ms
  cp:trace worker 7 launched  1 after 24.2ms +28ms
  cp:trace worker 8 launched  0 after 34.1ms +45ms
  cp:trace worker 0 completed 0 90.3ms/115.5ms after launch/start +90ms
  cp:trace worker 5 completed 0 97.1ms/121.3ms after launch/start +97ms
  cp:trace worker 2 completed 0 69.0ms/104.6ms after launch/start +69ms
  cp:trace worker 0 launching 1 +0ms
  cp:trace worker 0 launched  1 after 8.6ms +9ms
  cp:trace worker 9 completed 0 78.7ms/118.8ms after launch/start +78ms
  cp:trace worker 6 launched  0 after 45.7ms +53ms
```

### Electron Using Node.js Binary to Launch

```
$ DEBUG_COLORS=1 DEBUG=* NODE_PATH=/usr/local/bin/node electron parallel-launch/app
  cp:info Using 10 threads, launching 2 per worker for a total of 20 times +0ms
  cp:info Launching via launch and /usr/local/bin/node /Volumes/d/dev/cy/child-process/benchmarks/print-versions.js +3ms
  cp:trace worker 0 launching 0 +0ms
  cp:trace worker 2 launching 0 +0ms
  cp:trace worker 3 launching 0 +0ms
  cp:trace worker 5 launching 0 +0ms
  cp:trace worker 1 launching 0 +0ms
  cp:trace worker 4 launching 0 +0ms
  cp:trace worker 7 launching 0 +0ms
  cp:trace worker 9 launching 0 +0ms
  cp:trace worker 0 launched  0 after 630.5ms +631ms
  cp:trace worker 2 launched  0 after 1881.1ms +2s
  cp:trace worker 3 launched  0 after 1574.7ms +2s
  cp:trace worker 5 launched  0 after 1574.4ms +2s
  cp:trace worker 6 launching 0 +0ms
  cp:trace worker 8 launching 0 +0ms
  cp:trace worker 1 launched  0 after 1574.8ms +2s
  cp:trace worker 9 launched  0 after 1242.5ms +2s
  cp:trace worker 4 launched  0 after 1874.3ms +2s
  cp:trace worker 0 completed 0 2535.1ms/3165.6ms after launch/start +3s
  cp:trace worker 3 completed 0 1282.9ms/2857.5ms after launch/start +1s
  cp:trace worker 5 completed 0 1282.2ms/2856.6ms after launch/start +1s
  cp:trace worker 2 completed 0 1283.8ms/3164.8ms after launch/start +1s
  cp:trace worker 7 launched  0 after 1901.4ms +3s
  cp:trace worker 1 completed 0 2562.2ms/4136.9ms after launch/start +3s
  cp:trace worker 3 launching 1 +1ms
  cp:trace worker 3 launched  1 after 1280.9ms +1s
  cp:trace worker 5 launching 1 +1ms
  cp:trace worker 5 launched  1 after 1281.0ms +1s
  cp:trace worker 0 launching 1 +0ms
  cp:trace worker 0 launched  1 after 1280.9ms +1s
  cp:trace worker 6 launched  0 after 1278.5ms +2s
  cp:trace worker 3 completed 1 311.4ms/1592.2ms after launch/start +311ms
  cp:trace worker 5 completed 1 311.3ms/1592.3ms after launch/start +311ms
  cp:trace worker 9 completed 0 2257.5ms/3499.9ms after launch/start +2s
  cp:trace worker 0 completed 1 312.2ms/1593.1ms after launch/start +312ms
  cp:trace worker 2 launching 1 +0ms
  cp:trace worker 2 launched  1 after 1592.2ms +2s
  cp:trace worker 4 completed 0 2257.9ms/4132.2ms after launch/start +2s
  cp:trace worker 1 launching 1 +1ms
  cp:trace worker 1 launched  1 after 960.9ms +961ms
  cp:trace worker 4 launching 1 +0ms
  cp:trace worker 4 launched  1 after 649.1ms +649ms
  cp:trace worker 7 completed 0 2249.6ms/4150.8ms after launch/start +2s
  cp:trace worker 8 launched  0 after 666.6ms +2s
  cp:trace worker 1 completed 1 3.6ms/964.5ms after launch/start +3ms
```
