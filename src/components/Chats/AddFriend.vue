<template>
  <div>
    <div class="search-row">
      <a-input
        v-model="keyword"
        placehoder="输入要搜索的用户名或昵称"
      ></a-input>
      <a-button type="primary" @click="handleSearch">搜索</a-button>
    </div>
    <div class="user-list">
      <div v-if="userList.length <= 0" class="user-empty">暂无数据哦</div>
      <div
        v-for="(item, index) in userList"
        :key="index"
        v-show="item.username != 'sys'"
        class="user-item"
      >
        <div>
          <span>用户名：</span>
          <span>{{ item.username }} </span>
        </div>
        <div>
          <span>昵称：</span>
          <span>{{ item.nickname }}</span>
        </div>
        <div>
          <a-button
            size="small"
            type="primary"
            @click="handleAddFriend(item.username)"
            :disabled="item.isFriend || item.username == userInfo.username"
            >加好友
          </a-button>
        </div>
        <div>
          <a-button
            size="small"
            type="default"
            @click="handleSendMsg(item)"
            :disabled="item.username == userInfo.username"
            >发消息
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      keyword: '',
      userList: []
    }
  },
  computed: {
    ...mapState(['userInfo', 'chatUser'])
  },
  methods: {
    handleSearch() {
      if (this.keyword === '') {
        this.$message.info('搜索的内容不能为空哦')
      } else {
        this.$api.friend.search({ keyword: this.keyword }).then(res => {
          if (res.data.length <= 0) {
            this.$message.info('没有搜索到哦')
          }
          this.userList = res.data
        })
      }
    },
    handleAddFriend(username) {
      this.$api.friend.add({ add: this.userInfo.username, added: username }).then(res => {
        if (res.code === '200') {
          this.$message.success(res.msg)
          this.$store.commit('setNeedRefresh', 'friend')
        }
      })
    },
    handleSendMsg(item) {
      this.$store.commit('setChatUser', { username: item.username, nickname: item.nickname })
    }
  }
}
</script>
<style lang="less" scoped>
.search-row {
  display: flex;
  justify-content: space-between;
  .ant-input {
    width: 70%;
  }
  .ant-btn {
    width: 20%;
  }
}
.user-list {
  margin-top: 24px;
  .user-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      width: 100px;
      height: 32px;
    }
  }
}
</style>
