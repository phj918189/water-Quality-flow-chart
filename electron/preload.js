const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveToExcel: (data) => ipcRenderer.invoke('save-to-excel', data),
  saveAllToExcel: (data) => ipcRenderer.invoke('save-all-to-excel', data),
  selectFile: () => ipcRenderer.invoke('select-file'),
  saveFileDialog: (options) => ipcRenderer.invoke('save-file-dialog', options)
});

