// CLI
//
const ipc = require('node-ipc').default
const execa = require('execa')

ipc.serve('world', () => {
  ipc.server.on('message', (data, socket) => {
    console.log('server got %s', data.toString())
    ipc.server.emit(socket, 'message', { foo: 'bar' })
  })
  execa('./node_modules/.bin/electron', [require.resolve('./child')], {
    stdio: 'inherit',
  })
})

ipc.server.start()
