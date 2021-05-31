// 默认窗口创建的配置
export const defaultWinConfig = {
  frame: false,
  transparent: true,
  maximizable: false,
  resizable: false,
  backgroundColor: '#00000000',
  webPreferences: {
    // Use pluginOptions.nodeIntegration, leave this alone
    // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
    nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
    contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
  }
}
