import { ipcMain } from 'electron'
import chatsManager from '@/electron/windows/chats'
import loginManager from '@/electron/windows/login'
// 登录
ipcMain.on('login', async () => {
  // 创建并初始化聊天窗口
  chatsManager.create()
  // 关闭登录窗口
  loginManager.instance.close()
  console.log('关关关关登录')
})
