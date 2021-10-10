'use strict'
const ITER = 1e1
const { launchFnKey, launchFn, execPath } = require('./core/launch')
const { average } = require('./core/process')

console.log(process.versions)
;(async () => {
  try {
    const times = []
    const args = ['print-versions.js']
    console.log(
      `Launching via ${launchFnKey} and ${execPath} ${args.join(
        ' '
      )} ${ITER} times`
    )
    for (let i = 0; i < ITER; i++) {
      process.stdout.write('.')
      const ms = await launchFn(args)
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
