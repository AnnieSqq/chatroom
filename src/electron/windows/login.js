import { defaultWinConfig } from '@/electron/config'
import { initWindow } from '@/electron/windows'
const { BrowserWindow } = require('electron')

// 导出窗口实例
export default {
  instance: null,
  create() {
    // 如果实例已经存在，就不再创建
    if (this.instance) {
      return
    }
    // 创建窗口实例
    const win = new BrowserWindow({
      width: 400,
      height: 300,
      ...defaultWinConfig
    })
    // 赋值实例
    this.instance = win
    // 初始化窗口
    initWindow(win, 'login')
  }
}
