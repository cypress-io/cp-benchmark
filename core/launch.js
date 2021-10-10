'use strict'
const ITER = 1e1
const { execFile, fork } = require('child_process')

const now = require('performance-now')
const execa = require('execa')

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
  const start = now()
  const promise = new Promise((resolve, reject) => {
    execFile(execPath, args, { env }, (err, stdout, stderr) => {
      if (err != null) {
        reject(err)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
  const { stdout } = await promise
  const end = now()
  return end - start
}

async function launchFork(args) {
  const start = now()
  const promise = new Promise((resolve, reject) => {
    const child = fork(args[0], [], { env, silent: true })
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
  const res = await promise
  const end = now()
  return end - start
}

const launchFnKey =
  process.env.LAUNCH_SCRIPT != null
    ? 'launchFile'
    : process.env.LAUNCH_FORK != null
    ? 'launchFork'
    : 'launch'

const launchFn = { launch, launchFile, launchFork }[launchFnKey]

module.exports = {
  launch,
  launchFile,
  launchFork,
  execPath,
  env,
  launchFnKey,
  launchFn,
}
