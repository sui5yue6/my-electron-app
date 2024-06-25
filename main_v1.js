const {app, BrowserWindow} = require('electron')


// app.on('ready', () => {
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         autoHideMenuBar: true,
//     })
//     // win.loadURL('http://www.atguigu.com')
//     win.loadFile('./pages/index.html')
// })

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
    })
    win.loadFile('./pages/index.html')
}


// 管理窗口的生命周期   退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
// 打印目录环境
// console.log(__dirname)
// 打印版本
console.log(process.versions)

