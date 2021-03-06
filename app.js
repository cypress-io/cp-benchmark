'use strict'
const ITER = 1e1

const now = require('performance-now')
const { launchFnKey, launchFn, execPath } = require('./core/launch')
const { average } = require('./core/process')

;(async () => {
  try {
    const times = []
    const args = [require.resolve('./print-versions.js')]
    console.log(
      `Launching via ${launchFnKey} and ${execPath} ${args.join(
        ' '
      )} ${ITER} times`
    )
    for (let i = 0; i < ITER; i++) {
      process.stdout.write('.')
      const start = now()
      await launchFn(args)
      const end = now()
      times.push(end - start)
    }
    const { sum, avg } = average(times)
    console.log('\nTook %sms -> %sms each', sum.toFixed(3), avg.toFixed(3))
  } catch (err) {
    console.error(err)
  } finally {
    process.exit(0)
  }
})()
