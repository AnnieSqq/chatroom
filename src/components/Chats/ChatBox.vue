<template>
  <div class="chat-outer">
    <div v-for="(item, index) in chatList" :key="index" class="chat-item">
      <div
        class="chat-info"
        :style="{ color: item.sender == userInfo.username ? 'green' : 'blue' }"
      >
        <span>
          {{
            item.sender == chatUser.username
              ? chatUser.nickname
              : userInfo.nickname
          }}
        </span>
        <span>{{ item.createAt }}</span>
      </div>
      <div v-if="item.type == 'text'" class="chat-content">
        {{ item.content }}
      </div>
      <div v-if="item.type == 'file'" class="chat-file">
        <span>对方发了一个文件给你，请复制以下路径用浏览器打开</span>
        <span :href="item.content" download>{{ item.content }}</span>
      </div>
      <div v-if="item.type == 'img'" class="chat-img">
        <img :src="item.content" :alt="item.content" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ChatBox',
  data() {
    return {
      chatList: [

      ]
    }
  },
  computed: {
    ...mapState(['userInfo', 'chatUser', 'needRefresh'])
  },
  methods: {
    getChatList() {
      this.$api.chat.list({ receiver: this.chatUser.username }).then(res => {
        this.chatList = res.data
      })
    }
  },
  mounted() {
    this.getChatList()
  },
  watch: {
    chatUser() {
      this.getChatList()
    },
    needRefresh(newval, oldval) {
      if (newval === 'chat') {
        this.getChatList()
        this.$store.commit('setNeedRefresh', '')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.chat-outer {
  padding: 16px;
  .chat-item {
    .chat-img {
      img {
        width: 300px;
        height: auto;
      }
    }
  }
}
</style>
