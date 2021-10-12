'use strict'
const now = require('performance-now')
const { launchFn } = require('../core/launch')
const { average } = require('../core/process')

const { parentPort, workerData } = require('worker_threads')

const debug = require('debug')
const logInfo = debug('cp:info')
const logDebug = debug('cp:debug')
const logTrace = debug('cp:trace')

function dt(start) {
  return (now() - start).toFixed(1)
}

;(async () => {
  try {
    const times = []
    const args = [require.resolve('../print-versions.js')]
    const { ITER, workerID } = workerData
    for (let i = 0; i < ITER; i++) {
      logTrace(`worker ${workerID} launching ${i}`)
      const start = now()
      const promise = launchFn(args)
      const launched = now()
      logTrace(`worker ${workerID} launched  ${i} after ${dt(start)}ms`)
      await promise
      const end = now()
      logTrace(
        `worker ${workerID} completed ${i} ${dt(launched)}ms/${dt(
          start
        )}ms after launch/start`
      )
      times.push(end - start)
    }
    const { sum, avg } = average(times)
    logDebug(`worker ${workerID} DONE`)
    parentPort.postMessage({ sum, avg })
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
})()
