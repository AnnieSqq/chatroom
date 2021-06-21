import { defaultWinConfig } from '@/electron/config'
import { initWindow } from '@/electron/windows'
const { BrowserWindow } = require('electron')

// 导出窗口实例
export default {
  instance: null,
  async create(userInfo) {
    // 如果实例已经存在，就不再创建
    if (this.instance) {
      return
    }
    // 创建窗口实例
    const win = new BrowserWindow({
      width: 900,
      height: 600,
      ...defaultWinConfig
    })
    // 赋值实例
    this.instance = win
    // 初始化窗口
    initWindow(
      this,
      'chats?username=' +
        userInfo.username +
        '&nickname=' +
        userInfo.nickname +
        '&id=' +
        userInfo.id
    )
  }
}
