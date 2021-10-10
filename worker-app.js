'use strict'

const { launch } = require('./app')
const { Worker } = require('worker_threads')

const worker = new Worker(require.resolve('./app'))

worker
  .on('message', console.log)
  .on('error', console.error)
  .on('exit', (code) => {
    if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
  })
