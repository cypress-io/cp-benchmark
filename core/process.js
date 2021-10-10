'use strict'

function average(times) {
  const sum = times.reduce((acc, x) => acc + x)
  const avg = sum / times.length
  return { sum, avg }
}

module.exports = { average }
