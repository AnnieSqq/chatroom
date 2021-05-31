<template>
  <div class="outer">聊天界面</div>
</template>
<script>
export default {
  name: 'ChatBox',
  props: ['id'],
  data() {
    return {
      friendInfo: {
        id: 'xxx',
        username: 'xxx',
        nickname: 'xxx'
      },
      chatList: [
        {
          id: 'xxx',
          username: 'xxx',
          nickname: 'xxx',
          time: 'xxxx-xx-xx xx:xx:xx'
        },
        {
          id: 'xxx',
          username: 'xxx',
          nickname: 'xxx',
          time: 'xxxx-xx-xx xx:xx:xx'
        }
      ]
    }
  }
}
</script>
