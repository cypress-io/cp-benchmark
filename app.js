'use strict'
const ITER = 1e1
const { execFile, fork } = require('child_process')

const now = require('performance-now')
const execa = require('execa')
console.log(process.versions)

const nodePath = process.env.NODE_PATH
const hasNodePath = nodePath != null
const execPath = nodePath ?? process.execPath
const env = !hasNodePath ? {} : { ELECTRON_RUN_AS_NODE: 1 }

async function launch(args) {
  const start = now()
  const { stdout } = await execa(execPath, args, { env })
  const end = now()
  return end - start
}

async function launchFile(args) {
  const promise = new Promise((resolve, reject) => {
    execFile(execPath, args, { env }, (err, stdout, stderr) => {
      if (err != null) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
  const start = now()
  const { stdout } = await promise
  const end = now()
  return end - start
}

async function launchFork(args) {
  const promise = new Promise((resolve, reject) => {
    const child = fork(args[0], [], { env })
    child
      .on('error', (err) => reject(err))
      .on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Fork completed with exit code ${code}`))
        } else {
          resolve()
        }
      })
  })
  const start = now()
  const res = await promise
  const end = now()
  return end - start
}

function average(times) {
  const sum = times.reduce((acc, x) => acc + x)
  const avg = sum / times.length
  return { sum, avg }
}

module.exports = { launch, launchFile }

if (module.parent == null) {
  ;(async () => {
    try {
      const times = []
      const args = ['print-versions.js']
      console.log(`Launching ${execPath} ${args.join(' ')} ${ITER} times`)
      for (let i = 0; i < ITER; i++) {
        process.stdout.write('.')
        const ms = await launchFork(args)
        times.push(ms)
      }
      const { sum, avg } = average(times)
      console.log('\nTook %sms -> %sms each', sum.toFixed(3), avg.toFixed(3))
    } catch (err) {
      console.error(err)
    } finally {
      process.exit(0)
    }
  })()
}
