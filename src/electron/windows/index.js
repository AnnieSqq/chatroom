import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
/**
 * 初始化窗口
 * @param {BrowserWindow} windowItem 窗口实例对象
 * @param {String} route 窗口要加载的路由字符串
 */
export async function initWindow(windowItem, route) {
  const win = windowItem.instance
  win.on('closed', () => {
    // console.log('窗口关')
    windowItem.instance = null
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + route)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html#/' + route)
  }
}
