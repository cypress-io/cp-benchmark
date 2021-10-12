'use strict'
const now = require('performance-now')
const { launchFn } = require('../core/launch')
const { average } = require('../core/process')

const { parentPort, workerData } = require('worker_threads')

;(async () => {
  try {
    const times = []
    const args = [require.resolve('../print-versions.js')]
    const ITER = workerData
    for (let i = 0; i < ITER; i++) {
      process.stdout.write('.')
      const start = now()
      const ms = await launchFn(args)
      const end = now()
      times.push(end - start)
    }
    const { sum, avg } = average(times)
    parentPort.postMessage({ sum, avg })
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
})()
