'use strict'

const ITER = 20
const THREADS = 10

const now = require('performance-now')
const { average } = require('../core/process')

const { Worker, workerData } = require('worker_threads')
const { launchFnKey, execPath } = require('../core/launch')

const debug = require('debug')
const logInfo = debug('cp:info')
const logDebug = debug('cp:debug')

const launchesPerWorker = ITER / THREADS

function launchWorker(launchesPerWorker, workerID) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker'), {
      workerData: { ITER: launchesPerWorker, workerID },
    })
    let res = null

    worker
      .on('message', ({ sum, avg }) => (res = { sum, avg }))
      .on('error', console.error)
      .on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`))
        } else if (res == null) {
          reject(new Error('Worker stopped without sending stats'))
        } else {
          resolve(res)
        }
      })
  })
}

function launchViaWorker(launchesPerWorker) {
  const promises = []
  for (let i = 0; i < THREADS; i++) {
    promises.push(launchWorker(launchesPerWorker, i))
  }
  return Promise.all(promises)
}

;(async () => {
  try {
    const averages = []
    const sums = []
    const args = [require.resolve('../print-versions.js')]
    logInfo(
      `Using ${THREADS} threads, launching ${launchesPerWorker} per worker for a total of ${ITER} times`
    )
    logInfo(`Launching via ${launchFnKey} and ${execPath} ${args.join(' ')}`)
    const startAll = now()
    for (let i = 0; i < ITER; i += THREADS) {
      const all = await launchViaWorker(launchesPerWorker)

      for (const { sum, avg } of all) {
        sums.push(sum)
        averages.push(avg)
      }
    }
    const endAll = now()
    const sumAll = endAll - startAll
    const avgAll = sumAll / ITER

    const { avg: sum } = average(sums)
    const { avg } = average(averages)
    logInfo(
      '\nTook a total of\n%sms for %d -> %sms each.\n%sms per %s - > %sms each',
      sumAll.toFixed(3),
      ITER,
      avgAll.toFixed(3),
      sum.toFixed(3),
      launchesPerWorker,
      avg.toFixed(3)
    )
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
})()
