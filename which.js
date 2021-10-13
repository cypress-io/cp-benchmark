const now = require('performance-now')
const execa = require('execa')

;(async () => {
  const start = now()
  const promise = execa('which', ['node'])
  const started = now()
  await promise
  const completed = now()

  console.log(
    '%d | %s',
    (started - start).toFixed(3),
    (completed - started).toFixed(3)
  )
})()

