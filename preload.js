// 这里是在渲染进程打印

// 可以使用部分 node api

// 打印目录环境
// console.log(__dirname) // 这个不可用
// 打印版本
console.log(process.versions) // 这个可以用

const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("myAPI", {
    version: process.version,
    saveFile: (data) => {
        ipcRenderer.send('file-save', data);// 就是一个信道，消息的订阅发送
    },
    // readFile() {
    //     return ipcRenderer.invoke('file-read');// 就是一个信道，消息的订阅发送
    // },
    readFile: (data) => {
        return ipcRenderer.invoke('file-read', data);// 就是一个信道，消息的订阅发送
    },
})