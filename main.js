const {app, BrowserWindow, ipcMain} = require('electron')
const path = require("node:path");
const fs = require("node:fs");


// 这里也是关于ready的另一种写法
app.whenReady().then(() => {
        console.log('Ready!!!!!')
        createWindow()
        // 管理窗口的生命周期   激活窗口
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    }
)


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            preload: path.resolve(__dirname, './preload.js'), // 绝对路径，引入预加载js
        }
    })
    // 不是很理解为啥前面是ipcRenderer，这里就变成了ipcMain
    ipcMain.on('file-save', writeFile)
    ipcMain.handle('file-read', readFile)

    win.loadFile('./pages/index.html')
}

function writeFile(event, data) {
    console.log(data)
    // 这里需要引包
    fs.writeFileSync("h:/helloworld1.txt", data)
}

function readFile(event, data) {
    console.log(data)
    var res = fs.readFileSync("h:/" + data + ".txt").toString();
    return res;
}

// 管理窗口的生命周期   退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
