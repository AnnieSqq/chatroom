<template>
  <div class="outer">
    <!-- 侧栏区域 -->
    <div class="sider">
      <!-- 侧栏头部信息栏 -->
      <div class="sider-header">
        <!-- 头像 -->
        <div class="avatar"><a-icon type="user"></a-icon></div>
        <!-- 右侧信息栏 -->
        <div class="sider-info">
          <!-- 昵称 -->
          <div class="self-username">{{ userInfo.nickname }}</div>
          <!-- 用户名 -->
          <div class="self-nickname">{{ userInfo.username }}</div>
        </div>
      </div>
      <!-- 好友列表 -->
      <div class="friend-list">
        <a-popover
          v-for="(item, key, index) in friendList"
          :key="index"
          placement="right"
        >
          <template slot="content">
            <a-button
              type="primary"
              size="small"
              @click="handleDeleteFriend(item)"
              :disabled="item.username === 'sys'"
              >删除好友</a-button
            >
          </template>
          <div
            :class="{
              'friend-item': true,
              'friend-item-active': chatUser.username === item.username,
            }"
            @click="handleFriendClick(item)"
          >
            <!-- 头像 -->
            <div class="friend-avatar"><a-icon type="user"></a-icon></div>
            <!-- 好友信息 -->
            <div class="friend-info">
              <!-- 好友昵称 -->
              <div class="friend-nickname">
                <span>{{ item.nickname }}</span>
                <a-icon
                  v-if="hasMsg && item.username == 'sys'"
                  type="sound"
                  theme="filled"
                />
              </div>
              <!-- 好友用户名 -->
              <div class="friend-username" v-if="item.username !== 'sys'">
                {{ item.username }}({{ item.online ? "在线" : "离线" }})
              </div>
            </div>
          </div>
        </a-popover>
      </div>
      <!-- 侧栏底部工具栏 -->
      <div class="sider-bottom">
        <a-icon type="user-add" @click="isAddingFriend = true"></a-icon>
        <a-icon type="setting" @click="isSetting = true" spin></a-icon>
        <a-icon type="sync" @click="handleHeartBeat" spin />
      </div>
    </div>
    <!-- 主区 -->
    <div class="main">
      <!-- 头部 -->
      <div class="header">
        <span>{{ chatUser.nickname }}</span>
        <a-icon type="close" class="icon-close" @click="handleClose"></a-icon>
        <a-icon type="minus" @click="handleMinimize"></a-icon>
      </div>
      <!-- 聊天记录 -->
      <div class="content">
        <chat-box></chat-box>
      </div>
      <!-- 输入框 -->
      <div :class="{ 'input-box': true, 'input-box-focus': isInputFocus }">
        <div class="input-util">
          <div class="insert">
            <a-icon type="picture" @click="handleSendImg" />
            <a-icon type="file-add" @click="handleSendFile" />
          </div>
          <div class="send">
            <a-button type="default" size="small" @click="chatInput = ''"
              >清空</a-button
            >
            <a-button
              type="primary"
              size="small"
              :disabled="chatUser.username == 'sys' || !chatInput"
              @click="handleSendText"
              >发送</a-button
            >
          </div>
        </div>
        <a-input
          type="textarea"
          v-model="chatInput"
          @focus="isInputFocus = true"
          @blur="isInputFocus = false"
        ></a-input>
      </div>
    </div>
    <!-- 隐藏弹出框 -->
    <!-- 搜索添加好友 -->
    <a-modal v-model="isAddingFriend" title="添加好友">
      <add-friend></add-friend>
    </a-modal>
    <!-- 设置 -->
    <a-modal v-model="isSetting" title="设置">
      <setting></setting>
    </a-modal>
    <!-- 发送文件 -->
    <a-modal v-model="isChoosingFile" title="选择文件">
      <choose-file @fileok="handleSendFileOk"></choose-file>
    </a-modal>
    <!-- 发送图片 -->
    <a-modal v-model="isChoosingImg" title="选择图片">
      <choose-img @imgok="handleSendImgOk"></choose-img>
    </a-modal>
  </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import { mapState } from 'vuex'
import AddFriend from '@/components/Chats/AddFriend.vue'
import ChatBox from '@/components/Chats/ChatBox.vue'
import Setting from '@/components/Chats/Setting.vue'
import ChooseFile from '@/components/Chats/ChooseFile.vue'
import ChooseImg from '@/components/Chats/ChooseImg.vue'
export default {
  name: 'chats',
  components: { AddFriend, ChatBox, Setting, ChooseFile, ChooseImg },
  data() {
    return {
      // 好友列表
      friendList: {
        sys: {
          username: 'sys',
          nickname: '系统消息'
        }
      },
      // 输入框是否聚焦
      isInputFocus: false,
      // 聊天框内容
      chatInput: '',
      // 是否在选择图片
      isChoosingImg: false,
      // 是否在选择文件
      isChoosingFile: false,
      // 是否在添加好友
      isAddingFriend: false,
      // 是否在设置
      isSetting: false,
      // 是否有新的通知
      hasMsg: false
    }
  },
  computed: {
    ...mapState(['userInfo', 'chatUser', 'needRefresh'])
  },
  methods: {
    getFriendList() {
      this.$api.friend.list().then(res => {
        this.friendList = { ...res.data, ...this.friendList }
      })
    },
    handleHeartBeat() {
      this.$api.user.heart().then(res => {
        if (this.chatUser !== 'sys' && this.hasMsg === false) {
          this.hasMsg = res.data.hasMsg
        }
        this.$store.commit('setNeedRefresh', 'chat')
        this.$store.commit('setNeedRefresh', 'friend')
        this.$message.success('刷新成功')
      })
    },
    handleSendText() {
      this.$api.chat.sendText({
        receiver: this.chatUser.username,
        content: this.chatInput
      }).then(res => {
        this.$store.commit('setNeedRefresh', 'chat')
        this.chatInput = ''
      })
    },
    handleFriendClick(item) {
      this.$store.commit('setChatUser', item)
    },
    handleDeleteFriend(item) {
      this.$api.friend.delete({ add: this.userInfo.username, added: item.username }).then(res => {
        this.$store.commit('setNeedRefresh', 'friend')
      })
    },
    handleSendImg() {
      if (this.chatUser.username === 'sys') {
        return this.$message.info('不能给系统通知发消息哦')
      }
      this.isChoosingImg = true
    },
    handleSendImgOk(data) {
      this.$api.chat.sendImg({
        receiver: this.chatUser.username,
        content: data.filepath
      }).then(res => {
        this.$store.commit('setNeedRefresh', 'chat')
      })
    },
    handleSendFile() {
      if (this.chatUser.username === 'sys') {
        return this.$message.info('不能给系统通知发消息哦')
      }
      this.isChoosingFile = true
    },
    handleSendFileOk(data) {
      this.$api.chat.sendFile({
        receiver: this.chatUser.username,
        content: data.filepath
      }).then(res => {
        this.$store.commit('setNeedRefresh', 'chat')
      })
    },
    handleMinimize() {
      ipcRenderer.send('chat-min')
    },
    handleClose() {
      this.$api.user.logout().then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg)
        }
      }).finally(() => {
        ipcRenderer.send('chat-close')
      })
    }
  },
  mounted() {
    this.$store.commit('setUserInfo', this.$route.query)
    this.getFriendList()
    // setInterval(this.handleHeartBeat, 5000)
  },
  watch: {
    needRefresh(newval) {
      if (newval === 'friend') {
        this.friendList = { sys: { username: 'sys', nickname: '系统消息' } }
        this.getFriendList()
        this.$store.commit('setNeedRefresh', '')
      }
    },
    chatUser(newval) {
      if (newval.username === 'sys') {
        this.hasMsg = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.outer {
  background-image: linear-gradient(60deg, #fd7083, #f8bc9c);
  height: 576px;
  width: 876px;
  display: flex;
  box-shadow: 0px 0px 15px -5px #70a8fd;
  // 侧栏
  .sider {
    height: 100%;
    width: 300px;
    // 侧栏头部
    .sider-header {
      display: flex;
      align-items: center;
      height: 76px;
      // 头像
      .anticon {
        font-size: 28px;
        margin: 0 12px;
        padding: 8px;
        background-color: #ccc;
        border-radius: 25%;
      }
      // 名称
      .self-nickname {
        color: #666;
        font-size: 14px;
      }
      // 用户名
      .self-username {
        font-size: 16px;
        font-weight: bold;
      }
    }
    // 好友列表
    .friend-list {
      height: 460px;
      overflow: auto;
      .friend-item {
        height: 40px;
        display: flex;
        align-items: center;
        // 头像
        .anticon {
          font-size: 18px;
          margin: 0 12px;
          padding: 6px;
          background-color: #ccc;
          border-radius: 25%;
        }
        // 名称
        .friend-nickname {
          font-size: 14px;
          font-weight: bold;
          .anticon {
            font-size: 20px;
            margin: 0;
            padding: 0;
            background: none;
            border-radius: 0;
            vertical-align: middle;
            color: aqua;
            margin-left: 24px;
          }
        }
        // 用户名
        .friend-username {
          color: #666;
          font-size: 12px;
        }
      }
      .friend-item:hover {
        background-color: #ffffff33;
      }
      .friend-item-active {
        background-color: #ffffff22;
      }
    }
    // 侧栏底部工具栏
    .sider-bottom {
      .anticon {
        font-size: 24px;
        padding: 8px;
      }
      .anticon:hover {
        background-color: #ffffff33;
      }
    }
  }
  // 主体
  .main {
    width: 576px;
    // 头部
    .header {
      height: 76px;
      text-align: center;
      line-height: 76px;
      font-size: 20px;
      font-weight: bold;
      color: #8a3843;
      user-select: none;
      // 头部按钮
      .anticon {
        float: right;
        font-size: 16px;
        color: #f1faee;
        padding: 8px 16px;
      }
      .anticon:hover {
        background-color: #ffffff33;
      }
      .icon-close:hover {
        background-color: #fd7083cc;
      }
    }
    // 聊天内容
    .content {
      height: 300px;
      background-color: #eee;
      overflow: auto;
    }
    // 聊天输入
    .input-box {
      height: 200px;
      background-color: #fff;
      padding: 0 10px 10px;
      // 工具按钮
      .input-util {
        height: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // 插入工具
        .insert {
          display: flex;
        }
        // 图标
        .anticon {
          font-size: 18px;
          padding: 7px;
          color: #999;
        }
        .anticon:hover {
          background-color: #fd708333;
        }
        // 按钮
        .ant-btn {
          margin: 0 10px;
        }
      }
      // 输入框
      .ant-input {
        height: 160px;
        border-radius: 0;
        resize: none;
        border: none;
      }
      .ant-input:focus {
        box-shadow: none;
      }
    }
    .input-box-focus {
      box-shadow: 0 0 10px -2px @primary-color inset;
    }
  }
}
// 可拖动区域
.header,
.sider-header,
.friend-list,
.sider-bottom {
  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }
}
</style>
