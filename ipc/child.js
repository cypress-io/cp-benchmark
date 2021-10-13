// Electron app

const ipc = require('node-ipc').default
const electron = require('electron')
console.log('inside electron')

ipc.connectTo('world', () => {
  console.log('connected')
  ipc.of.world.on('message', (msg) => console.log('Got message %s', msg))
  ipc.of.world.emit('message', 'hello')
})
