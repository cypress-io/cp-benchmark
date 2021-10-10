'use strict'
const ITER = 1e1
const THREADS = 5
const { average } = require('../core/process')

const { Worker, workerData } = require('worker_threads')
const { launchFnKey, execPath } = require('../core/launch')

function launchWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker(require.resolve('./worker'), {
      workerData: launchesPerWorker,
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
    promises.push(launchWorker(launchesPerWorker))
  }
  return Promise.all(promises)
}

const launchesPerWorker = ITER / THREADS

;(async () => {
  try {
    const averages = []
    const sums = []
    const args = [require.resolve('../print-versions.js')]
    console.log(
      `Using ${THREADS} threads, launching ${launchesPerWorker} per worker for a total of ${ITER} times`
    )
    console.log(
      `Launching via ${launchFnKey} and ${execPath} ${args.join(' ')}`
    )
    for (let i = 0; i < ITER; i += THREADS) {
      process.stdout.write('.')
      const all = await launchViaWorker(launchesPerWorker)

      for (const { sum, avg } of all) {
        sums.push(sum)
        averages.push(avg)
      }
    }
    const { avg: sum } = average(sums)
    const { avg } = average(averages)
    console.log(
      '\nTook %sms per %s -> %sms each',
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
