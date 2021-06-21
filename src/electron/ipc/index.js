import { ipcMain } from 'electron'
import chatsManager from '@/electron/windows/chats'
import loginManager from '@/electron/windows/login'
// 登录
ipcMain.on('login', async (e, arg1) => {
  // 创建并初始化聊天窗口
  chatsManager.create(JSON.parse(arg1))
  // 关闭登录窗口
  loginManager.instance.close()
})

// 关闭登录窗口
ipcMain.on('login-close', () => {
  loginManager.instance.close()
})
// 登录窗口最小化
ipcMain.on('login-min', () => {
  loginManager.instance.minimize()
})

// 关闭聊天窗口
ipcMain.on('chat-close', () => {
  chatsManager.instance.close()
})
// 聊天窗口最小化
ipcMain.on('chat-min', () => {
  chatsManager.instance.minimize()
})
