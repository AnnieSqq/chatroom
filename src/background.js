'use strict'

import { app, protocol } from 'electron'
// import loginManager from '@/electron/windows/login'
import chatsManager from '@/electron/windows/chats'
import '@/electron/ipc'
// import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
// const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

/* electron app 生命周期 */

app.on('will-finish-launching', () => {})

// 主进程就绪，初始化各种窗口
app.on('ready', async () => {
  console.log('app ready')
  // 创建并初始化登录窗口
  // loginManager.create()
  // 聊天窗口
  chatsManager.create()
})

app.on('window-all-closed', () => {
  console.log('app window-all-closed')
})

app.on('before-quit', () => {
  console.log('app before-quit')
})

app.on('will-quit', () => {
  console.log('app will-quit')
})

app.on('quit', () => {
  console.log('app quit')
})
