if(window.ipcRenderer){
  window.ipcRenderer.on('main-process-message', (_event, ...args) => {
    console.debug('[Receive Main-process message]:', ...args)
  })
}